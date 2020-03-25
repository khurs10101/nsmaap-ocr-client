import React from 'react'
import ReactDOM from 'react-dom'
import AppRoute from './routes/AppRoute'

//testing
import ImageCrop from './components/ImageCropComponent'

import './styles/App.css'


const jsx= (
    <div>
        <AppRoute/>
    </div>
)


ReactDOM.render(jsx, document.getElementById('app'))