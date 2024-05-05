import {prisma} from '../db.js';

export const listar = async(req, res, next) => {
    try{
        const cobros = await prisma.cuenta_cobrar.findMany({
            where: {
                estado: 1,
            },
            include: {
                cliente: true,
                usuario: true
            }
        });
        res.json(cobros);
    }
    catch(error){
        next(error);
    }
}

export const buscar = async(req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        const cobro = await prisma.cuenta_cobrar.findFirst({
            where: {
                id_cuenta_cobrar: id,
                estado: 1
            },
            include: {
                cliente: true,
                usuario: true
            }
        });

        if(cobro){
            res.json(cobro);
        }
        else{
            res.json('Registro de cobro no encontrado...');
        }        
    }
    catch(error){
        next(error);
    }
}

export const insertar = async(req, res, next) => {
    try{
        const cobro = req.body;

        //se verifica si los datos del cliente corresponden a la venta registrada anteriormente
        const venta = await prisma.venta.findFirst({
            where: {
                id_cliente: cobro.id_cliente
            },
            select: {
                id_venta: true,
                id_cliente: true
            }
        });

        //si los datos de la venta se relacionan con el cliente dado, entonces se habilita la cuenta para cobrar por dicha venta
        if(venta){
            await prisma.cuenta_cobrar.create({
                data: {
                    id_venta: cobro.id_venta,
                    id_cliente: cobro.id_cliente,
                    fecha: new Date(cobro.fecha),
                    fecha_pago: new Date(cobro.fecha_pago),
                    monto: cobro.monto,
                    porcentaje_interes: cobro.porcentaje_interes,
                    tipo_interes: cobro.tipo_interes
                }
            });
            res.json('Registro de cobro creado...');            
        }
        else{
            //se emite el siguiente mensaje cuando la venta no corresponde al cliente seleccionado
            res.json('Los datos del cliente no corresponden a la venta...');
        }
    }
    catch(error){
        next(error);
    }
}

export const editar = async(req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        const cobro = req.body;

        const venta = await prisma.venta.findFirst({
            where: {
                id_cliente: cobro.id_cliente
            },
            select: {
                id_venta: true,
                id_cliente: true
            }
        });

        if(venta){
            await prisma.cuenta_cobrar.update({
                where: {
                    id_cuenta_cobrar: id
                },
                data: {
                    id_venta: cobro.id_venta,
                    id_cliente: cobro.id_cliente,
                    fecha: new Date(cobro.fecha),
                    fecha_pago: new Date(cobro.fecha_pago),
                    monto: cobro.monto,
                    porcentaje_interes: cobro.porcentaje_interes,
                    tipo_interes: cobro.tipo_interes
                }
            });
            res.json('Registro de cobro editado...');
        }
        else{
            res.json('Los datos del cliente no corresponden a la venta...');
        }
    }
    catch(error){
        next(error);
    }
}

export const eliminar = async(req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        await prisma.cuenta_cobrar.update({
            where: {
                id_cuenta_cobrar: id
            },
            data: {
                estado: 0
            }
        });
        res.json('Registro de cobro eliminado...');
    }
    catch(error){
        next(error);
    }
}