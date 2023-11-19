export async function POST(req){
    const url = "https://api.cloudinary.com/v1_1/dmbmqhtlb/image/upload"
    const data = await req.formData();
    const formData = new FormData();
    if(data.get('file')){
     const file = data.get('file');
     console.log(file)
     formData.append("file", file);
     formData.append("upload_preset", "ddfvptgec");
     console.log(formData)
     const imgResponse = await fetch(url, {
        method: "POST",
        body: formData
      })
    console.log(imgResponse)
    return Response.json(imgResponse)
    }
    
        


}