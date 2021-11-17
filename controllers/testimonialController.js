import db from "../config/db.js";
import {Testimonial} from "../models/Testimonial.js"


const guardarTestimonial = async (req, res) => {
    
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre === '') {
        errores.push({mensaje : 'El campo nombre está vacío'})
    }

    if(correo === '') {
        errores.push({mensaje : 'El campo correo está vacío'})
    }
    
    if(mensaje === '') {
        errores.push({mensaje : 'El campo mensaje está vacío'})
    }

    if(errores.length > 0) {

        // Consultar testimoniales  existeten en la base de datos
        const testimoniales = Testimonial.findAll()

            res.render('testimoniales', {
                pagina : 'testimoniales',
                errores,
                nombre,
                correo,
                mensaje,
                testimoniales
            })        
        
    } else {
        // Almacenar en la base de datos
        try {
            
            await Testimonial.create({
                nombre,
                correo, 
                mensaje
            });
            
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }


    
    console.log(req.body);
}

export {guardarTestimonial};