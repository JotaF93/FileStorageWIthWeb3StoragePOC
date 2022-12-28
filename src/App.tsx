import React, { useEffect, useState } from 'react';
import './App.css';
import FileUploader from './FileUploader';
import FileDownloader from './FileDownloader';
import ListUploads from './ListUploads';
import Web3 from 'web3';
import FileStorage from './abis/FileStorage.json';

const App = () => {
	const [account, setAccount] = useState('');
	const [contract, setContract] = useState(null);
	const [totalSupply, setTotalSupply] = useState(0);
	const [files, setFiles] = useState([{}]);

	const loadWeb3 = async () => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			window.alert('Considera usar Metamask!');
		}
	};

	const loadBlockchainData = async () => {
		const web3 = window.web3;
		const accounts = await web3.eth.getAccounts();
		setAccount(accounts[0]);

		const networkData = FileStorage.networks[5777];

		if (networkData) {
			const abi = FileStorage.abi;
			const address = networkData.address;
			const contract = new web3.eth.Contract(abi, address);
			setContract(contract);

			const totalSupply = await contract.methods.totalSupply().call();
			setTotalSupply(totalSupply);

			// Get all files in contract
			const files = await contract.methods.getFiles().call();
			setFiles(files);
			setTotalSupply(files.length);
		} else {
			window.alert('Contrato no desplegado en la red');
		}
	};

	useEffect(() => {
		loadWeb3();
		loadBlockchainData();
	}, []);

	// const mint = (file: any, contract: any) => {
	// 	contract?.methods
	// 		.mint(file)
	// 		.send({ from: account })
	// 		.once('receipt', () => {
	// 			setFiles((files) => [...files, file]);
	// 		});
	// };

	return (
		<div className='App'>
			<header className='App-header'>
				IPFS / web3.storage
				<FileUploader contract={contract} account={account} />
				<ListUploads files={files} contract={contract} account={account} />
				<FileDownloader />
			</header>
		</div>
	);
};

export default App;
