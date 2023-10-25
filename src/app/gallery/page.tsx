import UploadButton from "./upload-button";
import cloudinary from "cloudinary";
import GalleryGrid from "./gallery-grid";
import { SearchForm } from "./search-form";

export type SearchResult = {
  public_id: string;
  tags: string[];
};


export default async function GalleryPage({
  searchParams: { search },
}: {
  searchParams: {
    search: string;
  };
}) {
  // https://cloudinary.com/documentation/search_method
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image${search ? ` AND tags=${search}` : ""}`)
    .sort_by("created_at", "desc")
    .with_field("tags") // Used for Favorites 😍 (👉 cloudinary-image-heart component)
    .max_results(30)
    .execute()) as { resources: SearchResult[] }; // We just need the public_id and tags from the resources we get back from the API 📌 (2️⃣)

  // console.log("Results from Cloudinary Search API: ", results)  //  ===>  📌

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          {/* Client component */}
          <UploadButton />
        </div>

        <SearchForm initialSearch={search} />

        {/* We just need the public_id and tags from the resources we get back from the API 📌 (2️⃣) */}
        <GalleryGrid images={results.resources} />
      </div>
    </section>
  );
}





/* 📌
Results from Cloudinary Search API:  {
  total_count: 54,
  time: 100,
  next_cursor: '207089774ec5c2daaffcd372a64423b058a4ad06b7ea83c319941df51bec063d4cd62e08642db38cb1751f65bceda767',
  resources: [
    {
      asset_id: '6bfe848135317417c4550734c2ccf0cd',
      public_id: 'zfnoc5iubuqbckrcxc7g',
      folder: '',
      filename: 'zfnoc5iubuqbckrcxc7g',
      format: 'jpg',
      version: 1698179880,
      resource_type: 'image',
      type: 'upload',
      created_at: '2023-10-24T20:38:00+00:00',
      uploaded_at: '2023-10-24T20:38:00+00:00',
      bytes: 83962,
      backup_bytes: 0,
      width: 960,
      height: 640,
      aspect_ratio: 1.5,
      pixels: 614400,
      tags: [],
      url: 'http://res.cloudinary.com/dzsyv502k/image/upload/v1698179880/zfnoc5iubuqbckrcxc7g.jpg',
      secure_url: 'https://res.cloudinary.com/dzsyv502k/image/upload/v1698179880/zfnoc5iubuqbckrcxc7g.jpg',
      status: 'active',
      access_mode: 'public',
      access_control: null,
      etag: '4601a27512cd656dc8e536201a35baa8',
      created_by: null,
      uploaded_by: null
    },
    (...)
*/
