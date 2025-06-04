"use client";

import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Group, Image } from "react-konva";
import Konva from "konva";

interface LetterCanvasProps {
  width: number;
  height: number;
  scale?: number;
}

const LetterCanvas = ({ width, height, scale = 1 }: LetterCanvasProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<Konva.Image>(null);

  useEffect(() => {
    const loadHtmlAndConvert = async () => {
      try {
        const response = await fetch("/invite-sample.html");
        const htmlText = await response.text();

        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "-9999px";
        container.style.width = "640px";
        container.style.backgroundColor = "#000000";

        let fixedHtml = htmlText.replace("<trS>", "<tr>");

        fixedHtml = fixedHtml.replace(/<img[^>]*>/g, "");

        fixedHtml = fixedHtml.replace(
          /background-image\s*:\s*url\([^)]*\)/g,
          "background-image: none"
        );

        container.innerHTML = fixedHtml;
        document.body.appendChild(container);

        setTimeout(async () => {
          try {
            const images = container.querySelectorAll("img");
            images.forEach((img) => {
              img.style.display = "none";
            });

            const canvas = await html2canvas(container, {
              backgroundColor: null,
              scale: scale * 2,
              logging: false,
              useCORS: true,
              allowTaint: true,
              ignoreElements: (element) => element.tagName === "IMG",
            });

            document.body.removeChild(container);

            const dataUrl = canvas.toDataURL("image/png");
            const imageObj = new window.Image();

            imageObj.onload = () => {
              setImage(imageObj);
              if (imageRef.current) {
                imageRef.current.getLayer()?.batchDraw();
              }
            };

            imageObj.src = dataUrl;
          } catch (error) {
            console.error("Error converting HTML to canvas:", error);
          }
        }, 200);
      } catch (error) {
        console.error("Error loading HTML template:", error);
      }
    };

    loadHtmlAndConvert();
  }, [scale]);

  useEffect(() => {
    if (!document.getElementById("letter-html-container")) {
      const htmlContainer = document.createElement("div");
      htmlContainer.id = "letter-html-container";
      htmlContainer.style.position = "absolute";
      htmlContainer.style.top = "0";
      htmlContainer.style.left = "0";
      htmlContainer.style.width = "800px";
      htmlContainer.style.minHeight = "100px";
      htmlContainer.style.overflow = "visible";
      htmlContainer.style.opacity = "0";
      htmlContainer.style.pointerEvents = "none";
      htmlContainer.style.zIndex = "-1";
      document.body.appendChild(htmlContainer);

      if (containerRef) containerRef.current = htmlContainer;
    }

    return () => {
      const container = document.getElementById("letter-html-container");
      if (container) document.body.removeChild(container);
    };
  }, []);

  return (
    <Group>
      {image && (
        <Image
          alt=""
          ref={imageRef}
          image={image}
          width={width}
          height={height}
          listening={false}
        />
      )}
    </Group>
  );
};

export default LetterCanvas;
