import { useState } from 'react';
import { download, retrieve } from './helper';



function FileDownloader() {
  const [cid, setCid] = useState("");

  const handleOnSubmitDownload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await retrieve(cid);
    if (res) {
      download(`https://${cid}.ipfs.w3s.link/${res[0].name}`, res[0].name)
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', border: 'solid', borderColor: 'white', borderRadius: 15, borderWidth: 1, paddingRight: 10, paddingLeft: 10, paddingBottom: 10, margin: 10, width: '400px' }}>
      <p style={{ fontSize: 18 }}>Download File</p>

      <form onSubmit={e => handleOnSubmitDownload(e)}>
        <input
          placeholder='cid'
          type="text"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
        />
        <button type='submit'>
          Download File
        </button>
      </form>
    </div>
  )
}

export default FileDownloader;