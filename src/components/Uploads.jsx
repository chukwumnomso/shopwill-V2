import supabase from "./supabaseClient";
import { useState } from "react";

export default function Uploads() {
  return (
    <div className="h-50 w-full flex items-center justify-center border">
      <ImageUploadForm />
    </div>
  );
}

// Initialize Supabase client

function ImageUploadForm() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file1 || !file2) return;

    setUploading(true);
    // 1. Upload to Storage
    const fileName1 = `${Date.now()}-${file1.name}`;
    const fileName2 = `${Date.now()}-${file2.name}`;
    const { data: uploadData1, error: uploadError1 } = await supabase.storage
      .from("stockImages")
      .upload(fileName1, file1);

    const { data: uploadData2, error: uploadError2 } = await supabase.storage
      .from("stockImages")
      .upload(fileName2, file2);

    if (uploadError1 || uploadError2)
      return console.error(uploadError1, uploadError2);

    // 2. Get the Public URL
    const {
      data: { publicUrl: publicUrl1 },
    } = supabase.storage.from("stockImages").getPublicUrl(fileName1);
    const {
      data: { publicUrl: publicUrl2 },
    } = supabase.storage.from("stockImages").getPublicUrl(fileName2);
    setUploading(false);
    // 3. Save URL to your Database Table
    const { data: tableData, error: tableError } = await supabase
      .from("women_new_arrival") // e.g., 'posts' or 'profiles'
      .insert([
        {
          product_name: name,
          imageUrl_1: publicUrl1,
          imageUrl_2: publicUrl2,
          product_price: price,
          category: category,
        },
      ]);

    if (tableError) {
      console.error("Database error:", tableError.message);
    } else {
      console.log("Success! Saved to table:", tableData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile1(e.target.files[0])}
        className="border"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile2(e.target.files[0])}
        className="border"
      />
      <button type="submit" disabled={uploading} className="border">
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      <br />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <br />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
      />{" "}
      <br />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="category"
      />
    </form>
  );
}
