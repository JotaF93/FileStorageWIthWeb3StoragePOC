import { ChangeEvent, useState } from 'react';
import { storeFiles } from './helper';

function FileUploader({ mint, contract }: any) {
	const [file, setFile] = useState<File[]>([]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile([...file, e.target.files[0]]);
		}
	};

	const handleUploadClick = async () => {
		if (!file) {
			return;
		}
		// Take this as a POC. Do not follow this flow to store a file with a wallet in your project.
		// This flow doesn't await the aproval of a wallet to store the file in IPFS.
		// The files will be stored anyway but not asociated with an address account.
		const cid = await storeFiles(file);
		mint(cid, contract);
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					border: 'solid',
					borderColor: 'white',
					borderRadius: 15,
					borderWidth: 1,
					paddingRight: 10,
					paddingLeft: 10,
					paddingBottom: 10,
					margin: 10,
					width: '400px',
				}}>
				<p style={{ fontSize: 18 }}>Upload File</p>
				<input type='file' onChange={handleFileChange} />
				<button onClick={handleUploadClick}>Upload</button>
			</div>
		</>
	);
}

export default FileUploader;
