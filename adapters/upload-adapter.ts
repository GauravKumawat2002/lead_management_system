import { getToken } from "@/lib/tokenStorage";
export class UploadAdapter {
  private loader;

  constructor(loader: any) {
    this.loader = loader;
  }

  async upload() {
    try {
      const file = await this.loader.file;
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://localhost:8080/api/images/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${getToken("refreshToken")} `,
        },
      });

      const data = await response.json();

      if (!data) {
        throw new Error(data.error?.message || "Upload failed");
      }

      return {
        default: data.url,
      };
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }

  abort() {
    // Abort upload implementation
  }
}
