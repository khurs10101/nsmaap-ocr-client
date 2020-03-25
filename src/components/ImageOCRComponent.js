import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css' 
import { saveAs } from 'file-saver'
// const fs= require('web-fs')
const axios= require('axios')

class App extends PureComponent {
    state = {
      src: null,
      crop: {
        unit: '%',
      },
    };
  
    onSelectFile = e => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () =>
          this.setState({ src: reader.result })
        );
        reader.readAsDataURL(e.target.files[0]);
      }
    };
  
    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
      this.imageRef = image;
    };
  
    onCropComplete = crop => {
      this.makeClientCrop(crop);
    };
  
    onCropChange = (crop, percentCrop) => {
      // You could also use percentCrop:
      // this.setState({ crop: percentCrop });
      this.setState({ crop });
    };
  
    async makeClientCrop(crop) {
      if (this.imageRef && crop.width && crop.height) {
        const holder = await this.getCroppedImg(
          this.imageRef,
          crop,
          'newFile.jpeg'
        );
        let croppedImageUrl= holder[0]
        let blob= holder[1]
        //console.log(holder[0]);
        this.setState({ croppedImageUrl });
        this.setState({blob})
        //console.log(holder[0])
      }
    }
  
    getCroppedImg(image, crop, fileName) {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
  
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
  
      return new Promise((resolve, reject) => {
        // this.setState({imageFile: canvas.toDataURL('image/jpeg',0.5)})
        // console.log(canvas.toDataURL('image/jpeg'))
        canvas.toBlob(blob => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error('Canvas is empty');
            return;
          }
          blob.name = fileName;
          // saveAs(blob, "pretty image.png")
          
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          let holder =[this.fileUrl, blob]
          console.log(holder);
          resolve(holder);
        }, 'image/jpeg', 1.0);
      });
    }

    uploadImage= ()=>{
      let imageFile= this.state.blob
      let data= new FormData();
      data.append('file',imageFile, "temp.jpeg")
      axios.post("http://localhost:5000/upload",data,{})
            .then((response)=>{
              console.log(response)
              this.setState({convertText: response.data.output})
              console.log(this.state.convertText)
            })
    }
  
    render() {
      const { crop, croppedImageUrl, src, convertText } = this.state;
  
      return (
        <div className="App">
          <div>
            <input type="file" accept="image/*" onChange={this.onSelectFile} />
          </div>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          )}
          {croppedImageUrl && (
            <div>
                <img id="cropped_image" alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                <button onClick={this.uploadImage}>Send to OCR</button>
            </div>
          )}
          {
            convertText && (
              <div>
                <h2>{convertText}</h2>
              </div>
            )
          }
        </div>
      );
    }
  }


// const jsx=(
//     <div>
//         <App />
//     </div>
// )


// ReactDOM.render(jsx, document.getElementById('app'))
export default App