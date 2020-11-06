const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

fetch('version.json')
  .then(data => data.json())
  .then(version => {
    const prefix = version['version']

    fetch(`resversion${prefix}.json`)
      .then(data => data.json())
      .then(({ res }) => {
        let promises = Promise.resolve()

        Object.keys(res).forEach(key =>
          promises
            .then(
              fetch(`${res[key]['prefix']}/${key}`)
                .then(() => console.log(`加载文件完成: ${key}`))
                .catch(e => console.error(`加载文件失败: ${key}`, e))
            )
            .then(sleep(10))
        )
        return promises.then(() => console.log('资源预加载完成!'))
      })
  })
