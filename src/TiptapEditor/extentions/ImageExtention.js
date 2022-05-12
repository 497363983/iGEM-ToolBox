import Image from '@tiptap/extension-image'

export default Image.extend({
  addNodeView(){
    const container = document.createElement('div')

      container.addEventListener('click', () => {
        alert('clicked on the container')
      })

      const content = document.createElement('div')
      container.append(content)

      return {
        dom: container,
        contentDOM: content,
      }
  }
});