import { readdir, writeFile, stat } from 'node:fs/promises'

async function readDir(rootDir) {
	try {
		const files = await readdir(process.cwd() + rootDir)
		// const dirs = files.filter(file => {
		// 	stat(`${process.cwd()}${rootDir}/${file}`).then(res => {
		// 		return res.isDirectory()
		// 	})
		// })
		console.log('dir==', files)
	} catch (err) {
		console.error(err);
	}
}

readDir('/docs')