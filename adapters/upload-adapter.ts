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



      
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=e5d7ddbd03aca8f0bccfef2fbf846ff5",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || "Upload failed");
      }

      return {
        default: data.data.url,
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
