import React from 'react'
import '../app.scss'

const Upload = (props) => {

    const API = `http://localhost:5000/tasks/${props.id}/images`;
    // const API = `http://taskmaster-dev-esa.us-west-2.elasticbeanstalk.com/tasks/${props.id}/images`;
    console.log(API)

      return (

        <div>

        <form action={API} method="post" encType="multipart/form-data">
                <label>
                  <input name="file" type="file" />
                </label>
                <button>Upload</button>
              </form>
              </div>

      )
}

export default Upload;
