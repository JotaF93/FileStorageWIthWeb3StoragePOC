import { ChangeEvent, useState } from 'react';
import { Upload } from 'web3.storage';
import { listUploads, storeFiles } from './helper';

function ListUploads({ contract, account }: any) {
	const [loadedFiles, setLoadedFiles] = useState<Upload[]>([]);
	const [accountFiles, setAccountFiles] = useState([]);

	const handleOnClick = async () => {
		const elementList = await listUploads();
		setLoadedFiles(elementList);
	};

	const handleOnClickAccount = async () => {
		if (account) {
			const loadedAccountFiles = await contract.methods
				.retrieveByAddress(account)
				.call();
			setAccountFiles(loadedAccountFiles);
		}
	};

	const RenderWeb3StorageList = () => (
		<ul
			style={{
				listStyleType: 'none',
				textAlign: 'left',
				margin: 0,
				padding: 0,
			}}>
			{loadedFiles.map((item, index) => {
				return (
					<li key={item.cid}>
						<p style={{ fontSize: 12 }}>
							<b>File {index + 1}:</b>
							<br />
							Name:{item.name}
							<br />
							CID: {item.cid}
							<br />
						</p>
					</li>
				);
			})}
		</ul>
	);

	const RenderContractFileList = () => (
		<ul
			style={{
				listStyleType: 'none',
				textAlign: 'left',
				margin: 0,
				padding: 0,
			}}>
			{accountFiles.map((item: any, index: number) => {
				return (
					<li key={item}>
						<p style={{ fontSize: 12 }}>
							<b>File {index + 1}:</b>
							<br />
							CID: {item}
							<br />
						</p>
					</li>
				);
			})}
		</ul>
	);

	return (
		<div style={{ display: 'flex' }}>
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
				<p style={{ fontSize: 18 }}>List every Uploaded Files From WEB3</p>

				{loadedFiles.length > 0 ? <RenderWeb3StorageList /> : ''}

				<button onClick={handleOnClick}>List Files</button>
			</div>
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
				<p style={{ fontSize: 18 }}>List Account Files From Contract</p>

				{accountFiles.length > 0 ? <RenderContractFileList /> : ''}

				<button onClick={handleOnClickAccount}>List Files</button>
			</div>
		</div>
	);
}

export default ListUploads;
