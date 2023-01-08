import React from 'react'
import "../footer/Footer.css"
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <section className='footer'>
      {/* <div className='footerChild'> */}
          <div id="footer">
            <p>Copyright @2023 | Created by Luis Molinuevo</p>
            <a className='linkedin' href='https://www.linkedin.com/in/luismolinuevo/'><LinkedInIcon/></a>
          </div>
      {/* </div> */}

    </section>
  )
}

export default Footer