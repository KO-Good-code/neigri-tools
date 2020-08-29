
import './index.css'

class Over{
  constructor() {
    this.dom = document.createElement('div');
    this.progressBox = document.createElement('div');
    this.progress = document.createElement('div');
    this.progressbar = document.createElement('span');
    this.progressbartxt = document.createElement('span');
    const ul = document.createElement('div');
    ul.classList.add('timer')
    this.body = document.body;
    this.dom.classList.add('over-model');
    this.progress.classList.add('over-model-progress');
    this.progressBox.classList.add('over-model-progressBox');
    this.progressbar.classList.add('bar');
    this.dom.appendChild(this.progressBox);
    this.progressBox.appendChild(ul);
    this.progressBox.appendChild(this.progress);
    this.progress.appendChild(this.progressbar);
    this.progressBox.appendChild(this.progressbartxt);
    this.body.appendChild(this.dom);
    this.progressNumber = 0;
    this.progressbartxt.innerText = `0%`;
  }


  /**
   * @param {Object} config  
   * progressBoxCss 进度条框样式  
   * progressbarColor 进度条颜色  
   * color 字体颜色
   * backgroundColor 遮罩背景色
  */
  config(config = {}) {
    const { progressBoxCss } = config;
    Object.keys(progressBoxCss).forEach(i => {
      this.progress.style[i] = progressBoxCss[i]
    })
    this.dom.style.backgroundColor = config.backgroundColor;
    this.progressbar.style.backgroundColor = config.progressbarColor;
    this.progressbartxt.style.color = config.color;
  }

  imgLoad(imgs) {
    imgs.map( i => {
      const img = new Image();
      img.src = i;
      const r = Math.round(100 / imgs.length);
      img.onload = () => {
        this.setProgress(this.progressNumber + r)
      }
    })
  }
  
  actived(imgList = []) {
    this.dom.classList.add('over-model-active');
    this.imgLoad(imgList)
  }

  setProgress(i) {
    let pro = i;
    if(i> 100) {
      pro = 100;
      // this.cancel()
    };
    this.progressNumber = pro;
    this.progressbartxt.innerText = `${pro}%`;
    this.progressbar.style.width = `${pro}%`
  }

  cancel() {
    setTimeout(() => {
      this.dom.classList.remove('over-model-active');
      this.progressbartxt.innerText = `0%`;
      this.progressbar.style.width = `0%`;
      this.progressNumber = 0;
    }, 600)
  }
}

export default Over