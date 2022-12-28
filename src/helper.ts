import { Web3Storage } from 'web3.storage';
import * as Hash from 'typestub-ipfs-only-hash';
const CIDTool = require('cid-tool');

export function getAccessToken() {
	// If you're just testing, you can paste in a token
	// and uncomment the following line:
	return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYxYzEzODE3OTNFQmEzMTk2YTRFNjQ1MDAxYzA5ZGQxRjhGNjU0NjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njg5MDUwMTM5NTgsIm5hbWUiOiJ0ZXN0In0.CuFxR0iF4ZQtJV3D0n8LmZaRsbT0lQm0ezyd0wOhhuA';

	// In a real app, it's better to read an access token from an
	// environement variable or other configuration that's kept outside of
	// your code base. For this to work, you need to set the
	// WEB3STORAGE_TOKEN environment variable before you run your code.
	// return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
	return new Web3Storage({ token: getAccessToken() });
}

export async function listUploads() {
	const client = makeStorageClient();
	const elementList = [];
	for await (const upload of client.list()) {
		elementList.push(upload);
	}
	return elementList;
}

export async function retrieve(cid: string) {
	const client = makeStorageClient();
	const res = await client.get(cid);
	if (res && !res.ok) {
		throw new Error(`failed to get ${cid}`);
	}
	if (res) {
		return await res.files();
	}
}

export function download(url: string, filename: string) {
	fetch(url)
		.then((response) => response.blob())
		.then((blob) => {
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = filename;
			link.click();
		})
		.catch(console.error);
}

export async function mint(contract: any, account: string, files: any) {
	const cid = await generateCid(files);
	console.log('cid generated with ipfs-only-hash', cid);

	contract.methods
		.mint(cid)
		.send({ from: account })
		.once('confirmation', () => {
			storeFiles(files);
		});
}

export async function storeFiles(files: any) {
	// show the root cid as soon as it's ready
	const onRootCidReady = (cid: string) => {
		console.log('uploading files with cid:', cid);
	};

	const client = makeStorageClient();
	const cid = await client.put(files, { onRootCidReady });
	console.log('stored files with cid:', cid);
	return cid;
}

export async function generateCid(files: any) {
	const data = Buffer.from(files);
	const hash = await Hash.of(data);
	const cid = CIDTool.base32(hash);
	return cid;
}
