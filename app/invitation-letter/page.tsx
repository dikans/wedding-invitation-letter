'use client';

import React, { useRef, useState } from 'react';
import 'client-only';
import { Stage, Layer, Group, Rect, Text, Line, Shape, Circle } from 'react-konva';
import Konva from 'konva';

const CARD_WIDTH = 800;
const CARD_HEIGHT = 500;

export default function FlipCard() {
  const groupRef = useRef<Konva.Group>(null);
  const flapRef = useRef<Konva.Shape>(null);
  const [isFront, setIsFront] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);

  const handleClick = () => {
    if (isFlipping || !groupRef.current) return;
    
    // If on front side, flip the envelope
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
    } 
    // If on back side, animate the flap
    else if (!isFlapOpen && flapRef.current) {
      animateFlap();
    }
    // If flap is open, flip back to front
    else {
      setIsFlipping(true);
      
      // Reset flap position for next time we see the back
      if (flapRef.current) {
        flapRef.current.scaleY(1); // Reset the flip
        flapRef.current.y(0);      // Reset the y position
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
    
    // Animate the flap opening with a flip (using scaleY)
    const openFlap = new Konva.Tween({
      node: flapRef.current,
      scaleY: -1, // Flip the triangle vertically
      y: CARD_HEIGHT * 0, // Move down to compensate for the flip
      duration: 0.8,
      easing: Konva.Easings.EaseInOut,
      onFinish: () => {
        setIsFlapOpen(true);
        setIsFlipping(false);
      },
    });
    
    openFlap.play();
  };

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 400;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 300;

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
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
            fill="#FFFFFF"
            cornerRadius={8}
            shadowColor="black"
            shadowBlur={15}
            shadowOffsetY={5}
            shadowOpacity={0.2}
          />
          
          {isFront ? (
            // Front of envelope (clean white with stamp)
            <>
              {/* Postage Stamp */}
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
                <Circle
                  radius={18}
                  x={25}
                  y={20}
                  fill="#DDD"
                />
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
              
              {/* Wedding Invitation text */}
              <Text
                text="Wedding Invitation"
                fontSize={32}
                fontFamily="'Times New Roman', serif"
                fill="#333333"
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                align="center"
                verticalAlign="middle"
              />
            </>
          ) : (
            // Back of envelope with flap and seal
            <>
              {/* Envelope top flap */}
              <Shape
                sceneFunc={(context, shape) => {
                  context.beginPath();
                  context.moveTo(0, CARD_HEIGHT * 0);
                  context.lineTo(CARD_WIDTH / 2, 250); // Top point of flap
                  context.lineTo(CARD_WIDTH, CARD_HEIGHT * 0);
                  context.closePath();
                  context.fillStrokeShape(shape);
                }}
                fill="#000000" 
                stroke="#000000"
                strokeWidth={2}
              />
              
              {/* Triangular flap (combined diagonal lines as a shape) */}
              <Shape
                ref={flapRef as React.RefObject<Konva.Shape>}
                sceneFunc={(context, shape) => {
                  context.beginPath();
                  context.moveTo(0, 0);
                  context.lineTo(CARD_WIDTH / 2, CARD_HEIGHT / 2);
                  context.lineTo(CARD_WIDTH, 0);
                  context.closePath();
                  context.fillStrokeShape(shape);
                }}
                fill="#FFFFFF"
                stroke="#EEEEEE"
                strokeWidth={2}
                transformsEnabled="all"
                x={CARD_WIDTH / 2}
                y={0}
                offsetX={CARD_WIDTH / 2}
                offsetY={0}
              />
              
              {/* Hidden invitation content */}
              {/* <Group visible={isFlapOpen}>
                <Text
                  text="You're Invited"
                  fontSize={32}
                  fontFamily="'Times New Roman', serif"
                  fill="#333333"
                  width={CARD_WIDTH}
                  height={CARD_HEIGHT / 2}
                  y={CARD_HEIGHT / 4}
                  align="center"
                  verticalAlign="middle"
                />
              </Group> */}
              
              {/* Wax seal (moved to back) */}
              <Group x={CARD_WIDTH / 2} y={CARD_HEIGHT * 0.5}>
                <Circle
                  radius={30}
                  fill="#B23A48" // Red wax color
                  shadowColor="black"
                  shadowBlur={8}
                  shadowOffsetY={2}
                  shadowOpacity={0.3}
                />
                <Circle
                  radius={25}
                  fill="#C13A48" // Slightly different shade for texture
                />
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
              
              {/* Optional: Light text at top */}
              <Text
                text="Scott Hyde"
                fontSize={18}
                fontFamily="'Times New Roman', serif"
                fill="#333333"
                width={CARD_WIDTH}
                y={CARD_HEIGHT * 0.15}
                align="center"
                opacity={0.8}
              />
            </>
          )}
          
          {/* Very subtle shadow and lighting */}
          <Rect
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{ x: CARD_WIDTH, y: CARD_HEIGHT }}
            fillLinearGradientColorStops={[0, 'rgba(255, 255, 255, 0.4)', 1, 'rgba(240, 240, 240, 0.1)']}
            cornerRadius={8}
            shadowColor="black"
            shadowBlur={20}
            shadowOffsetY={8}
            shadowOpacity={0.1}
          />
        </Group>
      </Layer>
    </Stage>
  );
}
