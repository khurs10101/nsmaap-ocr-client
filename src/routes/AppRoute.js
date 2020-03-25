import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import {About, NotFound, Header} from '../components'
import ImageCrop from '../components/ImageCropComponent'
import ImageOCR from '../components/ImageOCRComponent'

const AppRoute= ()=>(
    <BrowserRouter>

        <Header />
    
        <Switch>
            <Route exact path="/" component={NotFound}/>
            <Route path="/crop" component={ImageCrop}/>
            <Route path="/ocr" component={ImageOCR} />
            <Route path="/about" component={About}/>
        </Switch>
        
    </BrowserRouter>
)

export default AppRoute