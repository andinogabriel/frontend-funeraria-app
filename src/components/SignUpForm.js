import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required('').email('Correo electronico invalido.'),
    password: yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres.')
            .max(30, 'La contraseña no debe superar los 30 caracteres.')
            .required(),
    rePassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir.')
        .required(''),
  });

export const SignUpForm = ({onSubmitCallback}) => {

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit = (data) => {
        const {email, password, firstName, lastName, rePassword} = data;
        onSubmitCallback({email, password, firstName, lastName, rePassword});
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">

                <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                            <i className="fa fa-user text-muted"></i>
                        </span>
                    </div>
                    <input
                        type="text" 
                        placeholder="Nombre" 
                        className={`form-control bg-white border-left-1 border-md ${errors?.firstName?.type === "required" && "is-invalid"}`}
                        {...register("firstName", { required: true})}
                        />
                </div>
                

            
                <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                            <i className="fa fa-user text-muted"></i>
                        </span>
                    </div>
                    <input
                        type="text" 
                        placeholder="Apellido" 
                        className={`form-control bg-white border-left-1 border-md ${errors?.lastName?.type === "required" && "is-invalid"}`}
                        {...register("lastName", { required: true, minLength: 1 })}
                    />
                </div>

            
                <div className="input-group col-lg-12 mb-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                            <i className="fa fa-envelope text-muted"></i>
                        </span>
                    </div>
                    <input
                        type="email" 
                        placeholder="Correo electronico" 
                        className={`form-control bg-white border-left-1 border-md ${errors?.email?.type === "required" && "is-invalid"}`}
                        {...register("email", { required: true})}
                    />
                    <div className="text-danger text-small d-block mb-2 ml-3 col-lg-12 mb-4">
                        {errors.email?.message}
                    </div>
                </div>

                <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                            <i className="fa fa-lock text-muted"/>
                        </span>
                    </div>
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        className={`form-control bg-white border-left-1 border-md ${errors?.password?.type === "required" && "is-invalid"}`}
                        {...register("password", { required: true, minLength: 8, maxLength: 30})}
                    />
                </div>
                {
                    errors?.password?.type === "minLength" 
                        &&
                        <div className="text-danger text-small d-block mb-2 ml-3 col-lg-12 mb-4">
                            La contraseña debe tener mas de 8 caracteres.
                        </div>
                }
                {
                    errors?.password?.type === "maxLength" 
                        &&
                        <div className="text-danger text-small d-block mb-2 ml-3 col-lg-12 mb-4">
                            La contraseña no debe superar los 30 caracteres.
                        </div>
                }

                
                <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                            <i className="fa fa-lock text-muted"/>
                        </span>
                    </div>
                    <input 
                        type="password" 
                        placeholder="Confirmar Contraseña" 
                        className={`form-control bg-white border-left-1 border-md ${errors?.rePassword?.type === "required" && "is-invalid"}`}
                        {...register("rePassword", { required: true})}
                    />
                </div>

                <div className="text-danger text-small d-block mb-2 ml-3 col-lg-12 mb-4">
                    {errors.rePassword?.message}
                </div>


    
                <div className="form-group col-lg-12 mx-auto mb-0">
                    <button type="submit" className="btn btn-primary btn-block py-2">
                        Registrar
                    </button>
                </div>
    
                <div className="text-center w-100">
                    <p className="font-weight-bold">¿Ya tenes cuenta?<Link to={"/signin"} className="text-primary ml-2">Inicia sesion aqui</Link></p>
                </div>

            </div>
        </form>
    );
};
