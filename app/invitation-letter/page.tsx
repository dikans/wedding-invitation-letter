"use client";

import React, { useRef, useState, useEffect } from "react";
import "client-only";
import {
  Stage,
  Layer,
  Group,
  Rect,
  Text,
  Line,
  Shape,
  Circle,
} from "react-konva";
import Konva from "konva";
import LetterCanvas from "../components/LetterCanvas";

const CARD_WIDTH = 800;
const CARD_HEIGHT = 500;
const LETTER_HEIGHT = 400;

export default function FlipCard() {
  const groupRef = useRef<Konva.Group>(null);
  const flapRef = useRef<Konva.Shape>(null);
  const flapLeftRef = useRef<Konva.Shape>(null);
  const flapRightRef = useRef<Konva.Shape>(null);
  const flapBottomRef = useRef<Konva.Shape>(null);
  const letterRef = useRef<Konva.Group>(null);
  const backRef = useRef<Konva.Rect>(null);
  const flapOverlayRef = useRef<Konva.Shape>(null);
  const flapGroupRef = useRef<Konva.Group>(null);
  const [isFront, setIsFront] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 800,
    height: 600,
  });
  const handleClick = () => {
    if (isFlipping || !groupRef.current) return;

    if (isFront) {
      setIsFlipping(true);

      const flipOut = new Konva.Tween({
        node: groupRef.current,
        scaleX: 0,
        duration: 0.5,
        easing: Konva.Easings.EaseInOut,
        onFinish: () => {
          setIsFront(false);

          const flipIn = new Konva.Tween({
            node: groupRef.current!,
            scaleX: 1,
            duration: 0.5,
            easing: Konva.Easings.EaseInOut,
            onFinish: () => {
              setIsFlipping(false);
            },
          });
          flipIn.play();
        },
      });

      flipOut.play();
    } else if (!isFlapOpen && flapRef.current) {
      animateFlap();
      setTimeout(() => {
        handleLetterFly();
      }, 1500);
    } else {
      setIsFlipping(true);

      if (flapGroupRef.current) {
        flapGroupRef.current.scaleY(1);
        flapGroupRef.current.y(0);
      }
      setIsFlapOpen(false);

      const flipOut = new Konva.Tween({
        node: groupRef.current,
        scaleX: 0,
        duration: 0.5,
        easing: Konva.Easings.EaseInOut,
        onFinish: () => {
          setIsFront(true);
          const flipIn = new Konva.Tween({
            node: groupRef.current!,
            scaleX: 1,
            duration: 0.5,
            easing: Konva.Easings.EaseInOut,
            onFinish: () => {
              setIsFlipping(false);
            },
          });
          flipIn.play();
        },
      });

      flipOut.play();
    }
  };

  const animateFlap = () => {
    if (!flapRef.current || isFlipping) return;

    setIsFlipping(true);

    // Open flap to see the letter
    const openFlap = new Konva.Tween({
      node: flapGroupRef.current!,
      scaleY: -1,
      y: CARD_HEIGHT * 0,
      duration: 0.8,
      easing: Konva.Easings.EaseInOut,
      onFinish: () => {
        setIsFlapOpen(true);
        setIsFlipping(false);
      },
    });

    openFlap.play();
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const centerX = windowSize.width / 2;
  const centerY = windowSize.height / 2;

  const handleLetterFly = () => {
    if (!letterRef.current || !groupRef.current) return;
    flapGroupRef.current?.moveToBottom();

    const letter = letterRef.current;
    const envelope = groupRef.current;
    const originalY = letter.y();
    const targetY = originalY - LETTER_HEIGHT - 100;
    const finalY = windowSize.height - LETTER_HEIGHT - 100;
    const letterOriginalX = letter.x();
    const envelopeOriginalX = envelope.x();

    const flyUp = new Konva.Tween({
      node: letter,
      y: targetY,
      duration: 0.8,
      easing: Konva.Easings.EaseInOut,
      onFinish: () => {
        letter.moveToTop();
        const rotateAnimation = new Konva.Tween({
          node: letter,
          rotation: 90,
          duration: 0.5,
          easing: Konva.Easings.EaseInOut,
          onFinish: () => {
            const flyDown = new Konva.Tween({
              node: letter,
              y: finalY,
              duration: 0.8,
              easing: Konva.Easings.EaseInOut,
              onFinish: () => {
                const scaleDownLetter = new Konva.Tween({
                  node: letter,
                  scaleX: 0.9,
                  scaleY: 0.9,
                  x: letterOriginalX + 500,
                  y: finalY,
                  duration: 0.6,
                  easing: Konva.Easings.EaseInOut,
                });

                const scaleDownEnvelope = new Konva.Tween({
                  node: envelope,
                  scaleX: 0.8,
                  scaleY: 0.8,
                  x: envelopeOriginalX - 100,
                  duration: 0.6,
                  easing: Konva.Easings.EaseInOut,
                });

                scaleDownLetter.play();
                scaleDownEnvelope.play();
              },
            });
            // letter.moveToTop();
            flyDown.play();
          },
        });

        rotateAnimation.play();
      },
    });

    flyUp.play();
  };

  return (
    <Stage width={windowSize.width} height={windowSize.height}>
      <Layer>
        <Group
          x={centerX}
          y={centerY}
          offsetX={CARD_WIDTH / 2}
          offsetY={CARD_HEIGHT / 2}
          scaleX={1}
          ref={groupRef as React.RefObject<Konva.Group>}
          onClick={handleClick}
          cursor="pointer"
        >
          <Rect
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            fill="#121212"
            cornerRadius={8}
            shadowColor="black"
            shadowBlur={15}
            shadowOffsetY={5}
            shadowOpacity={0.2}
          />

          <Rect
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{ x: CARD_WIDTH, y: CARD_HEIGHT }}
            fillLinearGradientColorStops={[
              0,
              "rgba(255, 255, 255, 0.4)",
              1,
              "rgba(240, 240, 240, 0.1)",
            ]}
            cornerRadius={8}
            shadowColor="black"
            shadowBlur={20}
            shadowOffsetY={8}
            shadowOpacity={0.1}
          />

          {isFront ? (
            <>
              {/* Stamp */}
              <Group x={CARD_WIDTH - 100} y={75}>
                <Rect
                  width={70}
                  height={85}
                  fill="#F9F9F9"
                  stroke="#E0E0E0"
                  strokeWidth={0.5}
                  cornerRadius={2}
                  dash={[1, 0.5]}
                />
                <Rect
                  width={60}
                  height={75}
                  x={5}
                  y={5}
                  fill="#EFEFEF"
                  stroke="#DDD"
                  strokeWidth={0.5}
                />
                <Circle radius={18} x={25} y={20} fill="#DDD" />
                <Rect
                  width={30}
                  height={25}
                  x={20}
                  y={45}
                  fill="#EFEFEF"
                  stroke="#DDD"
                  strokeWidth={0.5}
                />
              </Group>

              {/* Postmark */}
              <Group x={CARD_WIDTH - 150} y={75}>
                <Circle
                  radius={30}
                  opacity={0.2}
                  stroke="#888"
                  strokeWidth={1}
                />
                <Line
                  points={[40, -10, 15, 25]}
                  stroke="#888"
                  strokeWidth={1.5}
                  opacity={0.4}
                />
                <Line
                  points={[45, -5, 20, 30]}
                  stroke="#888"
                  strokeWidth={1.5}
                  opacity={0.4}
                />
              </Group>

              {/* Invitation */}
              <Text
                text="Hello Scott Hyde"
                fontSize={32}
                fontFamily="'Times New Roman', serif"
                fill="#f7ecd5"
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                align="center"
                verticalAlign="middle"
              />
            </>
          ) : (
            <>
              {/* Back of envelope */}
              <Rect
                ref={backRef as React.RefObject<Konva.Rect>}
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                fill="#121212"
                cornerRadius={8}
              />

              {/* Letter inside the envelope */}
              <Group
                ref={letterRef as React.RefObject<Konva.Group>}
                x={CARD_WIDTH / 2}
                y={CARD_HEIGHT / 2.3}
                offsetX={CARD_WIDTH / 2 - 20}
                offsetY={LETTER_HEIGHT / 2}
              >
                {/* <Rect
                  width={CARD_WIDTH - 40}
                  height={LETTER_HEIGHT}
                  fill="#f7ecd5"
                  cornerRadius={4}
                  shadowColor="black"
                  shadowBlur={5}
                  shadowOffsetY={2}
                  shadowOpacity={0.2}
                /> */}

                {/* <Group
                  x={(CARD_WIDTH - 40) / 2}
                  y={LETTER_HEIGHT / 2}
                  rotation={-90}
                  offsetX={(CARD_WIDTH - 40) / 2}
                  offsetY={LETTER_HEIGHT / 2}
                >
                  <Text
                    text="Wedding Invitation"
                    fontSize={28}
                    fontFamily="'Times New Roman', serif"
                    fill="#ac182b"
                    width={CARD_WIDTH - 60}
                    height={40}
                    align="center"
                    y={20}
                    x={10}
                  />

                  <Text
                    text="Dear Guest,"
                    fontSize={18}
                    fontFamily="Arial"
                    fill="#000000"
                    width={CARD_WIDTH - 60}
                    align="center"
                    y={70}
                    x={10}
                  />

                  <Text
                    text="Join us for our wedding celebration"
                    fontSize={16}
                    fontFamily="Arial"
                    fill="#000000"
                    width={CARD_WIDTH - 60}
                    align="center"
                    y={110}
                    x={20}
                  />

                  <Text
                    text="Saturday, 28th September 2024"
                    fontSize={16}
                    fontFamily="Arial"
                    fill="#000000"
                    width={CARD_WIDTH - 80}
                    align="center"
                    y={150}
                    x={20}
                  />

                  <Text
                    text="The Grand Ballroom"
                    fontSize={16}
                    fontFamily="Arial"
                    fill="#000000"
                    width={CARD_WIDTH - 80}
                    align="center"
                    y={180}
                    x={20}
                  />

                  <Text
                    text="RSVP by August 1st, 2024"
                    fontSize={16}
                    fontStyle="italic"
                    fontFamily="Arial"
                    fill="#000000"
                    width={CARD_WIDTH - 80}
                    align="center"
                    y={230}
                    x={20}
                  />
                </Group> */}
                <Group
                  x={(CARD_WIDTH - 40) / 4}
                  y={LETTER_HEIGHT / 4}
                  rotation={-90}
                  offsetX={(CARD_WIDTH - 40) / 2}
                  offsetY={LETTER_HEIGHT / 2}
                >
                  <LetterCanvas
                    width={LETTER_HEIGHT + 90}
                    height={CARD_WIDTH - 50}
                    scale={0.45}
                  />
                </Group>
              </Group>

              {/* Envelope flap and other details */}
              <Shape
                ref={flapLeftRef as React.RefObject<Konva.Shape>}
                sceneFunc={(context, shape) => {
                  const cornerRadius = 8;

                  context.beginPath();
                  context.moveTo(cornerRadius, CARD_HEIGHT);
                  context.quadraticCurveTo(
                    0,
                    CARD_HEIGHT,
                    0,
                    CARD_HEIGHT - cornerRadius
                  );
                  context.lineTo(0, cornerRadius);
                  context.quadraticCurveTo(0, 0, cornerRadius, 0);
                  context.lineTo(
                    CARD_WIDTH / 2 - cornerRadius,
                    CARD_HEIGHT / 2 - cornerRadius
                  );
                  context.quadraticCurveTo(
                    CARD_WIDTH / 2,
                    CARD_HEIGHT / 2,
                    CARD_WIDTH / 2,
                    CARD_HEIGHT / 2 + cornerRadius
                  );

                  context.lineTo(cornerRadius, CARD_HEIGHT - cornerRadius);
                  context.quadraticCurveTo(
                    0,
                    CARD_HEIGHT - cornerRadius,
                    cornerRadius,
                    CARD_HEIGHT
                  );

                  context.closePath();
                  context.fillStrokeShape(shape);
                }}
                fill="#121212"
                stroke="#333333"
                strokeWidth={1}
              />
              <Shape
                sceneFunc={(ctx, shape) => {
                  const r = 8;
                  ctx.beginPath();
                  ctx.moveTo(r, CARD_HEIGHT);
                  ctx.quadraticCurveTo(0, CARD_HEIGHT, 0, CARD_HEIGHT - r);
                  ctx.lineTo(0, r);
                  ctx.quadraticCurveTo(0, 0, r, 0);
                  ctx.lineTo(CARD_WIDTH / 2 - r, CARD_HEIGHT / 2 - r);
                  ctx.quadraticCurveTo(
                    CARD_WIDTH / 2,
                    CARD_HEIGHT / 2,
                    CARD_WIDTH / 2,
                    CARD_HEIGHT / 2 + r
                  );
                  ctx.lineTo(r, CARD_HEIGHT - r);
                  ctx.quadraticCurveTo(0, CARD_HEIGHT - r, r, CARD_HEIGHT);
                  ctx.closePath();
                  ctx.fillStrokeShape(shape);
                }}
                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                fillLinearGradientEndPoint={{ x: CARD_WIDTH, y: CARD_HEIGHT }}
                fillLinearGradientColorStops={[
                  0,
                  "rgba(255, 255, 255, 0.4)",
                  1,
                  "rgba(240, 240, 240, 0.1)",
                ]}
                cornerRadius={8}
                shadowColor="black"
                shadowBlur={20}
                shadowOffsetY={8}
                shadowOpacity={0.1}
              />

              <Shape
                ref={flapRightRef as React.RefObject<Konva.Shape>}
                sceneFunc={(context, shape) => {
                  const cornerRadius = 8;

                  context.beginPath();
                  context.moveTo(CARD_WIDTH - cornerRadius, CARD_HEIGHT);
                  context.quadraticCurveTo(
                    CARD_WIDTH,
                    CARD_HEIGHT,
                    CARD_WIDTH,
                    CARD_HEIGHT - cornerRadius
                  );

                  context.lineTo(CARD_WIDTH, cornerRadius);
                  context.quadraticCurveTo(
                    CARD_WIDTH,
                    0,
                    CARD_WIDTH - cornerRadius,
                    0
                  );

                  context.lineTo(
                    CARD_WIDTH / 2 + cornerRadius,
                    CARD_HEIGHT / 2 - cornerRadius
                  );

                  context.quadraticCurveTo(
                    CARD_WIDTH / 2,
                    CARD_HEIGHT / 2,
                    CARD_WIDTH / 2,
                    CARD_HEIGHT / 2 + cornerRadius
                  );

                  context.lineTo(
                    CARD_WIDTH - cornerRadius,
                    CARD_HEIGHT - cornerRadius
                  );
                  context.quadraticCurveTo(
                    CARD_WIDTH,
                    CARD_HEIGHT - cornerRadius,
                    CARD_WIDTH - cornerRadius,
                    CARD_HEIGHT
                  );

                  context.closePath();
                  context.fillStrokeShape(shape);
                }}
                fill="#121212"
                stroke="#333333"
                strokeWidth={1}
              />
              <Shape
                sceneFunc={(ctx, shape) => {
                  const r = 8;
                  ctx.beginPath();
                  ctx.moveTo(CARD_WIDTH - r, CARD_HEIGHT);
                  ctx.quadraticCurveTo(
                    CARD_WIDTH,
                    CARD_HEIGHT,
                    CARD_WIDTH,
                    CARD_HEIGHT - r
                  );
                  ctx.lineTo(CARD_WIDTH, r);
                  ctx.quadraticCurveTo(CARD_WIDTH, 0, CARD_WIDTH - r, 0);
                  ctx.lineTo(CARD_WIDTH / 2 + r, CARD_HEIGHT / 2 - r);
                  ctx.quadraticCurveTo(
                    CARD_WIDTH / 2,
                    CARD_HEIGHT / 2,
                    CARD_WIDTH / 2,
                    CARD_HEIGHT / 2 + r
                  );
                  ctx.lineTo(CARD_WIDTH - r, CARD_HEIGHT - r);
                  ctx.quadraticCurveTo(
                    CARD_WIDTH,
                    CARD_HEIGHT - r,
                    CARD_WIDTH - r,
                    CARD_HEIGHT
                  );
                  ctx.closePath();
                  ctx.fillStrokeShape(shape);
                }}
                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                fillLinearGradientEndPoint={{ x: CARD_WIDTH, y: CARD_HEIGHT }}
                fillLinearGradientColorStops={[
                  0,
                  "rgba(255, 255, 255, 0.4)",
                  1,
                  "rgba(240, 240, 240, 0.1)",
                ]}
                shadowColor="black"
                shadowBlur={20}
                shadowOffsetY={8}
                shadowOpacity={0.1}
              />

              <Shape
                ref={flapBottomRef as React.RefObject<Konva.Shape>}
                sceneFunc={(context, shape) => {
                  const cornerRadius = 8;

                  context.beginPath();
                  context.moveTo(cornerRadius, CARD_HEIGHT);
                  context.lineTo(CARD_WIDTH - cornerRadius, CARD_HEIGHT);
                  context.quadraticCurveTo(
                    CARD_WIDTH,
                    CARD_HEIGHT,
                    CARD_WIDTH - cornerRadius,
                    CARD_HEIGHT - cornerRadius
                  );

                  context.lineTo(
                    CARD_WIDTH / 2 + cornerRadius,
                    CARD_HEIGHT / 2 + cornerRadius
                  );

                  context.quadraticCurveTo(
                    CARD_WIDTH / 2,
                    CARD_HEIGHT / 2,
                    CARD_WIDTH / 2 - cornerRadius,
                    CARD_HEIGHT / 2 + cornerRadius
                  );

                  context.lineTo(cornerRadius, CARD_HEIGHT - cornerRadius);

                  context.quadraticCurveTo(
                    0,
                    CARD_HEIGHT,
                    cornerRadius,
                    CARD_HEIGHT
                  );

                  context.closePath();
                  context.fillStrokeShape(shape);
                }}
                fill="#121212"
                stroke="#333333"
                strokeWidth={1}
              />
              <Shape
                sceneFunc={(ctx, shape) => {
                  const r = 8;
                  ctx.beginPath();
                  ctx.moveTo(r, CARD_HEIGHT);
                  ctx.lineTo(CARD_WIDTH - r, CARD_HEIGHT);
                  ctx.quadraticCurveTo(
                    CARD_WIDTH,
                    CARD_HEIGHT,
                    CARD_WIDTH - r,
                    CARD_HEIGHT - r
                  );
                  ctx.lineTo(CARD_WIDTH / 2 + r, CARD_HEIGHT / 2 + r);
                  ctx.quadraticCurveTo(
                    CARD_WIDTH / 2,
                    CARD_HEIGHT / 2,
                    CARD_WIDTH / 2 - r,
                    CARD_HEIGHT / 2 + r
                  );
                  ctx.lineTo(r, CARD_HEIGHT - r);
                  ctx.quadraticCurveTo(0, CARD_HEIGHT, r, CARD_HEIGHT);
                  ctx.closePath();
                  ctx.fillStrokeShape(shape);
                }}
                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                fillLinearGradientEndPoint={{ x: CARD_WIDTH, y: CARD_HEIGHT }}
                fillLinearGradientColorStops={[
                  0,
                  "rgba(255, 255, 255, 0.4)",
                  1,
                  "rgba(240, 240, 240, 0.1)",
                ]}
                shadowColor="black"
                shadowBlur={20}
                shadowOffsetY={8}
                shadowOpacity={0.1}
              />

              {/* Flap that opens */}
              <Group
                ref={flapGroupRef}
                x={CARD_WIDTH / 2}
                y={0}
                offsetX={CARD_WIDTH / 2}
                offsetY={0}
              >
                <Shape
                  ref={flapRef as React.RefObject<Konva.Shape>}
                  sceneFunc={(context, shape) => {
                    const cornerRadius = 8;

                    context.beginPath();
                    context.moveTo(cornerRadius, 0);
                    context.lineTo(CARD_WIDTH - cornerRadius, 0);
                    context.quadraticCurveTo(
                      CARD_WIDTH,
                      0,
                      CARD_WIDTH - cornerRadius,
                      cornerRadius
                    );

                    context.lineTo(
                      CARD_WIDTH / 2 + cornerRadius,
                      CARD_HEIGHT / 2 - cornerRadius
                    );

                    context.quadraticCurveTo(
                      CARD_WIDTH / 2,
                      CARD_HEIGHT / 2,
                      CARD_WIDTH / 2 - cornerRadius,
                      CARD_HEIGHT / 2 - cornerRadius
                    );

                    context.lineTo(cornerRadius, cornerRadius);

                    context.quadraticCurveTo(0, 0, cornerRadius, 0);

                    context.closePath();
                    context.fillStrokeShape(shape);
                  }}
                  fill="#121212"
                  stroke="#333333"
                  strokeWidth={2}
                  transformsEnabled="all"
                  x={CARD_WIDTH / 2}
                  y={0}
                  offsetX={CARD_WIDTH / 2}
                  offsetY={0}
                />
                <Shape
                  ref={flapOverlayRef as React.RefObject<Konva.Shape>}
                  sceneFunc={(ctx, shape) => {
                    const r = 8;
                    ctx.beginPath();
                    ctx.moveTo(r, 0);
                    ctx.lineTo(CARD_WIDTH - r, 0);
                    ctx.quadraticCurveTo(CARD_WIDTH, 0, CARD_WIDTH - r, r);
                    ctx.lineTo(CARD_WIDTH / 2 + r, CARD_HEIGHT / 2 - r);
                    ctx.quadraticCurveTo(
                      CARD_WIDTH / 2,
                      CARD_HEIGHT / 2,
                      CARD_WIDTH / 2 - r,
                      CARD_HEIGHT / 2 - r
                    );
                    ctx.lineTo(r, r);
                    ctx.quadraticCurveTo(0, 0, r, 0);
                    ctx.closePath();
                    ctx.fillStrokeShape(shape);
                  }}
                  fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                  fillLinearGradientEndPoint={{ x: CARD_WIDTH, y: CARD_HEIGHT }}
                  fillLinearGradientColorStops={[
                    0,
                    "rgba(255, 255, 255, 0.4)",
                    1,
                    "rgba(240, 240, 240, 0.1)",
                  ]}
                  shadowColor="black"
                  shadowBlur={20}
                  shadowOffsetY={8}
                  shadowOpacity={0.1}
                  transformsEnabled="all"
                  x={CARD_WIDTH / 2}
                  y={0}
                  offsetX={CARD_WIDTH / 2}
                  offsetY={0}
                />
              </Group>

              {/* Wax seal */}
              <Group x={CARD_WIDTH / 2} y={CARD_HEIGHT * 0.5}>
                <Circle
                  radius={30}
                  fill="#B23A48"
                  shadowColor="black"
                  shadowBlur={8}
                  shadowOffsetY={2}
                  shadowOpacity={0.3}
                />
                <Circle radius={25} fill="#C13A48" />
                <Text
                  text="W&A"
                  fontSize={20}
                  fontFamily="Cursive"
                  fill="#FFF5E9"
                  align="center"
                  width={60}
                  offsetX={30}
                  offsetY={10}
                />
              </Group>
            </>
          )}
        </Group>
      </Layer>
    </Stage>
  );
}
