export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    },
    contentToc: {
      slots: {
        root: 'w-full max-w-none xl:w-72 2xl:w-80',
        container: 'w-full max-w-none',
        title: '!whitespace-normal !overflow-visible !text-clip',
        list: 'min-w-0 w-full',
        item: 'min-w-0 w-full',
        link: 'items-start w-full',
        linkText: '!whitespace-normal !overflow-visible !text-clip break-words leading-5'
      }
    }
  }
})
