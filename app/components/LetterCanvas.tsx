"use client";

import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Group, Image } from "react-konva";

interface LetterCanvasProps {
  width: number;
  height: number;
  scale?: number;
}

const LetterCanvas = ({ width, height, scale = 1 }: LetterCanvasProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<any>(null);

  useEffect(() => {
    const loadHtmlAndConvert = async () => {
      try {
        // Step 1: Load HTML file from public folder
        const response = await fetch("/invite-sample.html");
        const htmlText = await response.text();

        // Step 2: Create a hidden container and inject HTML
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "-9999px";
        container.style.width = "640px"; // Set fixed width for consistent rendering
        container.style.backgroundColor = "#000000";

        // Fix broken HTML tag in the template (<trS> instead of <tr>)
        let fixedHtml = htmlText.replace("<trS>", "<tr>");

        // Remove all image tags from HTML
        fixedHtml = fixedHtml.replace(/<img[^>]*>/g, "");

        // Replace background images in styles
        fixedHtml = fixedHtml.replace(
          /background-image\s*:\s*url\([^)]*\)/g,
          "background-image: none"
        );

        container.innerHTML = fixedHtml;
        document.body.appendChild(container);

        // Wait a moment to ensure all styles are applied
        setTimeout(async () => {
          try {
            // Find and temporarily hide all images
            const images = container.querySelectorAll("img");
            images.forEach((img) => {
              img.style.display = "none";
            });

            // Step 3: Convert to image with html2canvas (excluding images)
            const canvas = await html2canvas(container, {
              backgroundColor: null,
              scale: scale * 2,
              logging: false,
              useCORS: true,
              allowTaint: true,
              ignoreElements: (element) => element.tagName === "IMG",
            });

            // Remove the container after conversion
            document.body.removeChild(container);

            // Create image from canvas
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

  // The HTML container needs to be rendered outside of the Konva Stage context
  // We'll add it with a useEffect to avoid the Konva error
  useEffect(() => {
    // Create container only if it doesn't exist
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

      // Save reference
      if (containerRef) containerRef.current = htmlContainer;
    }

    // Clean up on unmount
    return () => {
      const container = document.getElementById("letter-html-container");
      if (container) document.body.removeChild(container);
    };
  }, []);

  // Only return the Konva elements
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
