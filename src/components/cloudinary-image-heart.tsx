"use client";
import { Heart } from "@/components/icons/heart";
import { CldImage, CldImageProps } from "next-cloudinary";
import { useState, useTransition } from "react";
import { FullHeart } from "@/components/icons/full-heart";
import { SearchResult } from "@/app/gallery/page";
import { setAsFavoriteAction } from "@/app/gallery/actions";
import { ImageMenu } from "./image-menu";



/*
The all goal of this file is that when we click, it adds a tag 'favorite' to our Cloudinary image,
such as this one:
https://console.cloudinary.com/console/c-cd288e26fa4d34ea26516f0097f33b/media_library/homepage/asset/4f15275b4a0111853fb2239fd905a580/manage/metadata?context=manage

This is done with the server action (experimental) setAsFavoriteAction (@/app/gallery/actions)
*/





export function CloudinaryImage(
  props: {
    imageData: SearchResult;
    onUnheart?: (unheartedResource: SearchResult) => void;  // Optimistic update from favorites-list.tsx
  } & Omit<CldImageProps, "src">
) {
  const [transition, startTransition] = useTransition();  // <--- Next recommandation

  const { imageData, onUnheart } = props;

  // Optimisitc update
  const [isFavorited, setIsFavorited] = useState(
    imageData.tags.includes("favorite")
  );

  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />
      {isFavorited ? (
        <FullHeart
          onClick={() => {
            onUnheart?.(imageData);
            setIsFavorited(false);
            startTransition(() => {
              // @/app/gallery/actions
              setAsFavoriteAction(imageData.public_id, false);
            });
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            setIsFavorited(true);
            startTransition(() => {
              // @/app/gallery/actions
              setAsFavoriteAction(imageData.public_id, true);
            });
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer"
        />
      )}
      <ImageMenu image={imageData} />
    </div>
  );
}
