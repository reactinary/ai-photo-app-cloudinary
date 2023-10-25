"use client";
import { useEffect, useState } from "react";
import { SearchResult } from "../gallery/page";
import { ImageGrid } from "@/components/image-grid";
import { CloudinaryImage } from "@/components/cloudinary-image-heart";



/*
favorites/page.tsx :
<FavoritesList initialResources={results.resources} />
*/



export default function FavoritesList({ initialResources }: { initialResources: SearchResult[] }) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <ImageGrid
      images={resources}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="400"
            height="300"
            alt="an image of something"
            onUnheart={(unheartedResource) => {
              // OPTIMISTIC UPDATE
              setResources((currentResources) =>
                currentResources.filter(
                  (resource) =>
                    resource.public_id !== unheartedResource.public_id
                )
              );
            }}
          />
        );
      }}
    />
  );
}
