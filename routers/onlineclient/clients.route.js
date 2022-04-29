const {Product} = require('../../models/Warehouse/Product')
const {Clinica} = require('../../models/DirectorAndClinica/Clinica')
const {Service} = require('../../models/Services/Service')
const {ProductConnector} = require('../../models/Warehouse/ProductConnector')
const {
    OnlineClient,
    validateOnlineClient,
} = require('../../models/OnlineClient/OnlineClient')
const {
    OnlineProduct,
    validateOnlineProduct,
} = require('../../models/OnlineClient/OnlineProduct')
const {
    OnlineService,
    validateOnlineService,
} = require('../../models/OnlineClient/OnlineService')
const {
    OnlineConnector,
    validateOnlineConnector,
} = require('../../models/OnlineClient/OnlineConnector')
const {
    OnlineCounteragent,
} = require('../../models/OnlineClient/OnlineCounteragent')
const {OnlineAdver} = require('../../models/OnlineClient/OnlineAdver')

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
        } = req.body
        //=========================================================
        // CheckData
        const checkClient = validateOnlineClient(client).error
        if (checkClient) {
            return res.status(400).json({
                error: error.message,
            })
        }

        const checkOnlineConnector = validateOnlineConnector(connector).error

        if (checkOnlineConnector) {
            return res.status(400).json({
                error: error.message,
            })
        }

        //=========================================================
        // CreateClient

        const fullname = client.lastname + ' ' + client.firstname

        const newclient = new OnlineClient({...client, fullname})
        await newclient.save()

        //=========================================================
        // CreateOnlineConnector
        let probirka = 0
        if (connector.probirka) {
            probirka =
                (
                    await OnlineConnector.find({
                        clinica: connector.clinica,
                        probirka: {$ne: 0},
                        createdAt: {
                            $gte: new Date(new Date().setUTCDate(0, 0, 0, 0)),
                        },
                    })
                ).length + 1
        }

        const newconnector = new OnlineConnector({
            ...connector,
            client: newclient._id,
            probirka,
        })
        await newconnector.save()

        newclient.connectors.push(newconnector._id)
        await newclient.save()

        //=========================================================
        // CreateServices
        let totalprice = 0
        for (const service of services) {
            const {error} = validateOnlineService(service)

            if (error) {
                return res.status(400).json({
                    error: error.message,
                })
            }

            //=========================================================
            // Create Service
            const newservice = new OnlineService({
                ...service,
                client: newclient._id,
                connector: newconnector._id,
            })

            await newservice.save()

            totalprice += service.service.price

            newconnector.services.push(newservice._id)
            await newconnector.save()
        }

        // CreateProducts
        for (const product of products) {
            const {error} = validateOnlineProduct(product)

            if (error) {
                return res.status(400).json({
                    error: error.message,
                })
            }

            const newproduct = new OnlineProduct({
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
            const newcounteragent = new OnlineCounteragent({
                client: newclient._id.toString(),
                connector: newconnector._id.toString(),
                services: [...newconnector.services],
                ...counteragent,
            })
            await newcounteragent.save()
        }

        if (adver.adver) {
            const newadver = new OnlineAdver({
                client: newclient._id,
                connector: newconnector._id,
                ...adver,
            })

            await newadver.save()
        }

        const response = await OnlineConnector.findById(newconnector._id)
            .populate('client')
            .populate('services')
            .populate('products')

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
        } = req.body

        const updateClient = await OnlineClient.findByIdAndUpdate(
            client._id,
            client,
        )

        const updateOnlineConnector = await OnlineConnector.findById(
            connector._id,
        )

        //=========================================================
        // CreateOnlineConnector
        let probirka = 0
        if (connector.probirka && !updateOnlineConnector.probirka) {
            probirka =
                (
                    await OnlineConnector.find({
                        clinica: client.clinica,
                        probirka: {$ne: 0},
                        createdAt: {
                            $gte: new Date(new Date().setUTCDate(0, 0, 0, 0)),
                        },
                    })
                ).length + 1

            updateOnlineConnector.probirka = probirka
            await updateOnlineConnector.save()
        }

        //=========================================================
        // CreateServices
        let totalprice = 0
        for (const service of services) {
            const {error} = validateOnlineService(service)

            if (error) {
                return res.status(400).json({
                    error: error.message,
                })
            }

            //=========================================================
            // Create Service
            const newservice = new OnlineService({
                ...service,
                client: client._id,
                connector: updateOnlineConnector._id,
            })

            await newservice.save()

            totalprice += service.service.price

            updateOnlineConnector.services.push(newservice._id)
        }

        // CreateProducts
        for (const product of products) {
            const {error} = validateOnlineProduct(product)

            if (error) {
                return res.status(400).json({
                    error: error.message,
                })
            }

            const newproduct = new OnlineProduct({
                ...product,
                client: client._id,
                connector: updateOnlineConnector._id,
            })

            await newproduct.save()
            totalprice += product.product.price * product.pieces

            updateOnlineConnector.products.push(newproduct._id)
        }

        if (counteragent.counterdoctor) {
            const oldcounteragent = await OnlineCounteragent.findOne({
                connector: connector._id,
            })

            if (oldcounteragent) {
                oldcounteragent.counteragent = counteragent.counteragent
                oldcounteragent.counterdoctor = counteragent.counterdoctor
                oldcounteragent.services = [...updateOnlineConnector.services]
                await oldcounteragent.save()
            } else {
                const newcounteragent = new OnlineCounteragent({
                    client: client._id.toString(),
                    connector: updateOnlineConnector._id.toString(),
                    services: [...updateOnlineConnector.services],
                    ...counteragent,
                })
                await newcounteragent.save()
            }
        }

        if (adver.adver) {
            const oldadver = await OnlineAdver.findOne({
                connector: connector._id,
            })

            if (oldadver) {
                oldadver.adver = adver.adver
                await oldadver.save()
            } else {
                const newadver = new OnlineAdver({
                    client: client._id,
                    connector: updateOnlineConnector._id,
                    ...adver,
                })
                await newadver.save()
            }
        }

        updateOnlineConnector.totalprice =
            updateOnlineConnector.totalprice + totalprice
        await updateOnlineConnector.save()

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

        const connectors = await OnlineConnector.find({
            clinica,
            createdAt: {
                $gte: beginDay,
                $lt: endDay,
            },
        })
            .populate('client', '-createdAt -updatedAt -isArchive -__v')
            .populate('services')
            .populate('products')
            .sort({_id: -1})

        res.status(200).send(connectors)
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}

// Update client
module.exports.update = async (req, res) => {
    try {
        const {client, connector, counteragent, adver} = req.body

        if (!client) {
            return res
                .status(404)
                .send({message: "Foydalanuvchi ma'lumotlari topilmadi"})
        }
        const update = await OnlineClient.findByIdAndUpdate(client._id, client)

        const oldconnector = await OnlineConnector.findById(connector._id)

        if (counteragent.counterdoctor) {
            const oldcounteragent = await OnlineCounteragent.findOne({
                client: client._id,
                connector: connector._id,
            })

            if (oldcounteragent) {
                oldcounteragent.counteragent = counteragent.counteragent
                oldcounteragent.counterdoctor = counteragent.counterdoctor
                oldcounteragent.services = [...oldconnector.services]
                await oldcounteragent.save()
            } else {
                const newcounteragent = new OnlineCounteragent({
                    client: client._id.toString(),
                    connector: connector._id,
                    services: [...oldconnector.services],
                    ...counteragent,
                })
                await newcounteragent.save()
            }
        }

        if (adver.adver) {
            const oldadver = await OnlineAdver.findOne({
                client: client._id,
            })

            if (oldadver) {
                oldadver.adver = adver.adver
                await oldadver.save()
            } else {
                const newadver = new OnlineAdver({
                    client: client._id,
                    connector: connector._id,
                    ...adver,
                })
                await newadver.save()
            }
        }

        res.status(200).send(update)
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}
