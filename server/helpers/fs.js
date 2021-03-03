import fs from 'fs'
import path from 'path'

export function updateFile(filename, data) {
	return new Promise((resolve, reject) => {
		const _path = path.resolve(__dirname, '..', 'data', filename)

		fs.writeFile(_path, JSON.stringify({data}), 'utf8', err => {
			if (err) {
				reject(err)
				return
			}
			resolve(true)
		})
	})
}
