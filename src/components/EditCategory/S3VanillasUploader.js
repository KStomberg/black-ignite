import React, {useEffect, useState} from 'react';
import axios from 'axios';

function S3VanillaUploader() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load files on init
  useEffect(() => refreshFiles(), []);

  const onFileSelect = async (evt) => {
    // Show the "Uploading...." prompt
    setIsLoading(true);

    // Grab file from <input type="file" /> element
    let file = evt.target.files[0];

    // Ask our server to generate a "presigned" S3 request for us
    // This will allow us to upload directly to S3,
    // using axios.
    // See server/routers/s3.router.js
    let presignRes = await axios.post('/presign-upload', {
      filename: file.name
    });

    // Prepare our upload request.
    let formData = new FormData();
    // Include the actual file content in the request
    // Include all of the fields from our presigned request.
    // This is what authenticates our request, giving us access to the 
    // bucket on S3
    for (let key in presignRes.data.fields) {
      formData.append(key, presignRes.data.fields[key]);
    }
    formData.append("file", file);

    // Upload the file, using the presigned URL
    await axios.post(presignRes.data.url, formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });

    // Grab the files from the server, so we can display
    // images/videos on the DOM
    refreshFiles();

    // Hide the "Uploading...." prompt
    setIsLoading(false);
  }

  const refreshFiles = async () => {
    // See server/routers/s3.router.js
    // We are also using pre-signed URLs for 
    // viewing images from S3.
    const res = await axios.get('/files');
    setFiles(res.data);
  };

  return (
    <>
      <h2>S3VanillaUploader</h2>
      <input type="file" onChange={onFileSelect} />

      {/* Show loading prompt, on upload */}
      <p>
      {isLoading && <marquee width="70">Uploading...</marquee>}
      </p>

      <h3>Files</h3>
      {/* Render our uploaded files */}
      {files.map(f => 
        <>
          {/* 
            We'll attempt to render as either an image, or a video,
            just to demonstrate that we can support either type of content.
           */}
          <p>
            Image:
            <img src={f} />
          </p>

          <p>
            Video:
            <video controls>
              <source src={f} type="video/mp4" />
            </video>
          </p>
        </>
      )}
    </>
  )
}

export default S3VanillaUploader;