import { ChangeEvent, useState } from 'react';
import { mint } from './helper';
function FileUploader({ account, contract }: any) {
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
		mint(contract, account, file);
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
