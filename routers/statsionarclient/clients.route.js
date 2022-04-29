const {Product} = require('../../models/Warehouse/Product')
const {Clinica} = require('../../models/DirectorAndClinica/Clinica')
const {Service} = require('../../models/Services/Service')
const {Room} = require('../../models/Rooms/Room')
const {ProductConnector} = require('../../models/Warehouse/ProductConnector')
const {
    StatsionarClient,
    validateStatsionarClient,
} = require('../../models/StatsionarClient/StatsionarClient')
const {
    StatsionarProduct,
    validateStatsionarProduct,
} = require('../../models/StatsionarClient/StatsionarProduct')
const {
    StatsionarService,
    validateStatsionarService,
} = require('../../models/StatsionarClient/StatsionarService')
const {
    StatsionarConnector,
    validateStatsionarConnector,
} = require('../../models/StatsionarClient/StatsionarConnector')
const {
    StatsionarCounteragent,
} = require('../../models/StatsionarClient/StatsionarCounteragent')
const {
    StatsionarAdver,
} = require('../../models/StatsionarClient/StatsionarAdver')
const {
    StatsionarRoom,
} = require('../../models/StatsionarClient/StatsionarRoom')
const {
    StatsionarDaily,
} = require('../../models/StatsionarClient/StatsionarDaily')
const {TableColumn} = require("../../models/Services/TableColumn");
const {ServiceTable} = require("../../models/Services/ServiceTable");
// register
module.exports.register = async (req, res) => {
    try {
        const {
            client,
            connector,
            services,
            products,
            counteragent,
            adver,
            room,
        } = req.body

        //=========================================================
        // CheckData
        const checkClient = validateStatsionarClient(client).error
        if (checkClient) {
            return res.status(400).json({
                error: error.message,
            })
        }

        const checkStatsionarConnector = validateStatsionarConnector(connector)
            .error
        if (checkStatsionarConnector) {
            return res.status(400).json({
                error: error.message,
            })
        }
        //=========================================================
        // CreateClient
        const id =
            'S' +
            ((await StatsionarClient.find({clinica: client.clinica})).length +
                10001)

        const fullname = client.lastname + ' ' + client.firstname

        delete client._id

        const newclient = new StatsionarClient({...client, id, fullname})
        await newclient.save()

        //=========================================================
        // CreateStatsionarConnector
        let probirka = 0
        if (connector.probirka) {
            probirka =
                (
                    await StatsionarDaily.find({
                        clinica: connector.clinica,
                        probirka: {$ne: 0},
                        createdAt: {
                            $gte: new Date(new Date().setUTCDate(0, 0, 0, 0)),
                        },
                    })
                ).length + 1
        }

        const newconnector = new StatsionarConnector({
            ...connector,
            client: newclient._id,
        })
        await newconnector.save()

        const newdaily = new StatsionarDaily({
            clinica: newconnector.clinica,
            client: newclient._id,
            connector: newconnector._id,
            probirka: 'S' + probirka,
            reseption: newconnector.reseption,
        })
        await newdaily.save()

        newconnector.dailys.push(newdaily._id)
        await newconnector.save()

        newclient.connectors.push(newconnector._id)
        await newclient.save()

        //=========================================================
        // CreateServices
        let totalprice = 0
        for (const service of services) {
            const {error} = validateStatsionarService(service)

            if (error) {
                return res.status(400).json({
                    error: error.message,
                })
            }

            //=========================================================
            // Product decrement
            const productconnectors = await ProductConnector.find({
                clinica: client.clinica,
                service: service.serviceid,
            })

            for (const productconnector of productconnectors) {
                const product = await Product.findById(productconnector.product)
                product.total = product.total - productconnector.pieces * service.pieces
                await product.save()
            }

            //=========================================================
            // Create Service
            const serv = await Service.findById(service.serviceid)
                .populate('column', 'col1 col2 col3 col4 col5')
                .populate('tables', 'col1 col2 col3 col4 col5')
            const newservice = new StatsionarService({
                ...service,
                service: {
                    _id: serv._id,
                    name: serv.name,
                    price: serv.price,
                    shortname: serv.shortname,
                    doctorProcient: serv.doctorProcient,
                    counterAgentProcient: serv.counterAgentProcient,
                    counterDoctorProcient: serv.counterDoctorProcient
                },
                client: newclient._id,
                connector: newconnector._id,
                column: {...serv.column},
                tables: [...JSON.parse(JSON.stringify(serv.tables))]
            })

            await newservice.save()

            totalprice += service.service.price * service.pieces

            newconnector.services.push(newservice._id)
            await newconnector.save()
        }

        // CreateProducts
        for (const product of products) {
            const {error} = validateStatsionarProduct(product)

            if (error) {
                return res.status(400).json({
                    error: error.message,
                })
            }

            const produc = await Product.findById(product.productid)
            produc.total = produc.total - product.pieces
            await produc.save()

            const newproduct = new StatsionarProduct({
                ...product,
                client: newclient._id,
                connector: newconnector._id,
            })

            await newproduct.save()
            totalprice += product.product.price * product.pieces

            newconnector.products.push(newproduct._id)
            await newconnector.save()
        }

        newconnector.totalprice = totalprice
        await newconnector.save()

        if (counteragent.counterdoctor) {
            const newcounteragent = new StatsionarCounteragent({
                client: newclient._id.toString(),
                connector: newconnector._id.toString(),
                services: [...newconnector.services],
                ...counteragent,
            })
            await newcounteragent.save()
        }

        if (adver.adver) {
            const newadver = new StatsionarAdver({
                client: newclient._id,
                connector: newconnector._id,
                ...adver,
            })

            await newadver.save()
        }

        if (room.roomid) {
            const roomm = await Room.findById(room.roomid)
            roomm.position = true
            await roomm.save()

            const newroom = new StatsionarRoom({
                ...room,
                connector: newconnector._id,
                client: newclient._id,
            })
            await newroom.save()

            newconnector.room = newroom._id
            await newconnector.save()
        }
        newdaily.services = [...newconnector.services]
        newdaily.products = [...newconnector.products]
        await newdaily.save()

        const response = await StatsionarConnector.findById(newconnector._id)
            .populate('client')
            .populate('services')
            .populate('products')
            .populate('room')

        res.status(201).send(response)
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}

module.exports.add = async (req, res) => {
    try {
        const {
            client,
            connector,
            services,
            products,
            counteragent,
            adver,
            room,
        } = req.body

        const updateClient = await StatsionarClient.findByIdAndUpdate(
            client._id,
            client,
        )

        const updateStatsionarConnector = await StatsionarConnector.findById(
            connector._id
        )

        //=========================================================
        // CreateStatsionarConnector
        let probirka = 0
        if (connector.probirka) {
            probirka =
                (
                    await StatsionarDaily.find({
                        clinica: client.clinica,
                        probirka: {$ne: 0},
                        createdAt: {
                            $gte: new Date(new Date().setUTCDate(0, 0, 0, 0)),
                        },
                    })
                ).length + 1
        }

        const newdaily = new StatsionarDaily({
            clinica: client.clinica,
            client: client._id,
            connector: updateStatsionarConnector._id,
            probirka: 'S' + probirka,
            reseption: updateStatsionarConnector.reseption,
        })

        await newdaily.save()

        updateStatsionarConnector.dailys.push(newdaily._id)
        await updateStatsionarConnector.save()

        //=========================================================
        //=========================================================
        // CreateServices
        let totalprice = 0
        for (const service of services) {
            const {error} = validateStatsionarService(service)

            if (error) {
                return res.status(400).json({
                    error: error.message,
                })
            }

            //=========================================================
            // Product decrement
            const productconnectors = await ProductConnector.find({
                clinica: client.clinica,
                service: service.serviceid,
            })

            for (const productconnector of productconnectors) {
                const product = await Product.findById(productconnector.product)
                product.total = product.total - productconnector.pieces * service.pieces
                await product.save()
            }

            //=========================================================
            // Create Service
            const serv = await Service.findById(service.serviceid)
                .populate('column', 'col1 col2 col3 col4 col5')
                .populate('tables', 'col1 col2 col3 col4 col5')
            const newservice = new StatsionarService({
                ...service,
                service: {
                    _id: serv._id,
                    name: serv.name,
                    price: serv.price,
                    shortname: serv.shortname,
                    doctorProcient: serv.doctorProcient,
                    counterAgentProcient: serv.counterAgentProcient,
                    counterDoctorProcient: serv.counterDoctorProcient
                },
                client: client._id,
                connector: updateStatsionarConnector._id,
                column: {...serv.column},
                tables: [...JSON.parse(JSON.stringify(serv.tables))]
            })

            await newservice.save()

            newdaily.services.push(newservice._id)

            totalprice += service.service.price * service.pieces

            updateStatsionarConnector.services.push(newservice._id)
        }

        // CreateProducts
        for (const product of products) {
            const {error} = validateStatsionarProduct(product)

            if (error) {
                return res.status(400).json({
                    error: error.message,
                })
            }

            const produc = await Product.findById(product.productid)
            produc.total = produc.total - product.pieces
            await produc.save()

            const newproduct = new StatsionarProduct({
                ...product,
                client: client._id,
                connector: updateStatsionarConnector._id,
            })

            await newproduct.save()
            totalprice += product.product.price * product.pieces

            newdaily.products.push(newproduct._id)
            updateStatsionarConnector.products.push(newproduct._id)
        }

        if (counteragent.counterdoctor) {
            const oldcounteragent = await StatsionarCounteragent.findOne({
                connector: connector._id,
            })

            if (oldcounteragent) {
                oldcounteragent.counteragent = counteragent.counteragent
                oldcounteragent.counterdoctor = counteragent.counterdoctor
                // oldcounteragent.services = [...updateStatsionarConnector.services]
                await oldcounteragent.save()
            } else {
                const newcounteragent = new StatsionarCounteragent({
                    client: client._id.toString(),
                    connector: updateStatsionarConnector._id.toString(),
                    // services: [...updateStatsionarConnector.services],
                    ...counteragent,
                })
                await newcounteragent.save()
            }
        }

        const counteragen = await StatsionarCounteragent.findOne({
            connector: connector._id
        })
        if (counteragen) {
            counteragen.services = [...updateStatsionarConnector.services]
            counteragen.save()
        }

        if (adver.adver) {
            const oldadver = await StatsionarAdver.findOne({
                connector: connector._id,
            })

            if (oldadver) {
                oldadver.adver = adver.adver
                await oldadver.save()
            } else {
                const newadver = new StatsionarAdver({
                    client: client._id,
                    connector: updateStatsionarConnector._id,
                    ...adver,
                })
                await newadver.save()
            }
        }

        if (room.room) {
            const oldroom = await StatsionarRoom.findOne({
                client: client._id,
            })

            if (oldroom) {
                const updateOld = await Room.findByIdAndUpdate(oldroom.roomid, {
                    position: false,
                })

                oldroom.room = room.room
                oldroom.roomid = room.roomid
                await oldroom.save()

                const updateNew = await Room.findByIdAndUpdate(room.roomid, {
                    position: true,
                })
            } else {
                const newroom = new StatsionarRoom({
                    client: client._id,
                    connector: updateStatsionarConnector._id,
                    ...room,
                })

                const updateNew = await Room.findByIdAndUpdate(room.roomid, {
                    position: true,
                })

                updateStatsionarConnector.room = newroom._id
                await updateStatsionarConnector.save()
                await newroom.save()
            }
        }

        updateStatsionarConnector.totalprice =
            updateStatsionarConnector.totalprice + totalprice
        await updateStatsionarConnector.save()

        await newdaily.save()

        res.status(201).send({message: "Xizmatlar ro'yxatga olindi"})
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}

//Clients getall
module.exports.getAll = async (req, res) => {
    try {
        const {clinica, beginDay, endDay} = req.body

        const clinic = await Clinica.findById(clinica)

        if (!clinic) {
            return res.status(400).json({
                message: "Diqqat! Klinika ma'lumotlari topilmadi.",
            })
        }

        const connectors = await StatsionarConnector.find({
            clinica,
            createdAt: {
                $gte: beginDay,
                $lt: endDay,
            },
        })
            .populate('client', '-createdAt -updatedAt -isArchive -__v')
            .populate('services')
            .populate('products')
            .populate("doctor")
            .populate("clinica")
            .populate("reseption")
            .populate("room")
            .sort({_id: -1})

        res.status(200).send(connectors)
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}

//Clients getall
module.exports.getAllReseption = async (req, res) => {
    try {
        const {clinica, beginDay, endDay} = req.body

        const clinic = await Clinica.findById(clinica)

        if (!clinic) {
            return res.status(400).json({
                message: "Diqqat! Klinika ma'lumotlari topilmadi.",
            })
        }

        const connectors = await StatsionarConnector.find({
            clinica,
            createdAt: {
                $gte: beginDay,
                $lt: endDay,
            },
        })
            .select('client doctor createdAt services products room diagnosis')
            .populate('client', 'firstname lastname fullname born phone id address gender')
            .populate("services", 'service pieces createdAt')
            .populate("products", 'product pieces createdAt')
            .populate("doctor", 'firstname lastname')
            .populate("room", '')
            .sort({_id: -1})
        res.status(200).send(connectors)
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}

// Update client
module.exports.update = async (req, res) => {
    try {
        const {client, connector, counteragent, adver, room} = req.body
        if (!client) {
            return res
                .status(404)
                .send({message: "Foydalanuvchi ma'lumotlari topilmadi"})
        }

        const update = await StatsionarClient.findByIdAndUpdate(client._id, client)

        const oldconnector = await StatsionarConnector.findById(connector._id)

        if (counteragent.counterdoctor) {
            const oldcounteragent = await StatsionarCounteragent.findOne({
                client: client._id,
                connector: connector._id,
            })

            if (oldcounteragent) {
                oldcounteragent.counteragent = counteragent.counteragent
                oldcounteragent.counterdoctor = counteragent.counterdoctor
                // oldcounteragent.services = [...oldconnector.services]
                await oldcounteragent.save()
            } else {
                const newcounteragent = new StatsionarCounteragent({
                    client: client._id.toString(),
                    connector: connector._id,
                    // services: [...oldconnector.services],
                    ...counteragent,
                })
                await newcounteragent.save()
            }
        }

        const counteragen = await StatsionarCounteragent.findOne({
            connector: connector._id
        })

        if (counteragen) {
            counteragen.services = [...oldconnector.services]
            counteragen.save()
        }

        if (adver.adver) {
            const oldadver = await StatsionarAdver.findOne({
                client: client._id,
            })

            if (oldadver) {
                oldadver.adver = adver.adver
                await oldadver.save()
            } else {
                const newadver = new StatsionarAdver({
                    client: client._id,
                    connector: connector._id,
                    ...adver,
                })
                await newadver.save()
            }
        }

        if (room.room) {
            const oldroom = await StatsionarRoom.findOne({
                client: client._id,
            })

            if (oldroom) {
                const updateOld = await Room.findByIdAndUpdate(oldroom.roomid, {
                    position: false,
                })

                oldroom.room = room.room
                oldroom.roomid = room.roomid
                await oldroom.save()

                const updateNew = await Room.findByIdAndUpdate(room.roomid, {
                    position: true,
                })
            } else {
                const newroom = new StatsionarRoom({
                    client: client._id,
                    connector: oldconnector._id,
                    ...room,
                })
                const updateNew = await Room.findByIdAndUpdate(room.roomid, {
                    position: true,
                })
                await newroom.save()
            }
        }
        res.status(200).send(update)
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}
