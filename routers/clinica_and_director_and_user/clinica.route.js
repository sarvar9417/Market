const {
  Clinica,
  validateClinica,
} = require('../../models/DirectorAndClinica/Clinica')

module.exports.register = async (req, res) => {
  try {
    const { error } = validateClinica(req.body)

    if (error) {
      return res.status(400).json({
        message: error.message,
      })
    }
    const {
      name,
      organitionName,
      image,
      phone1,
      phone2,
      phone3,
      bank,
      bankNumber,
      inn,
      address,
      orientation,
      director,
      mfo,
    } = req.body

    const clinica = await Clinica.find({ name })

    if (clinica.length > 0) {
      return res.status(400).json({
        message:
          "Diqqat! Klinika nomida biroz o'zgartirish qilib keyin kiriting.",
      })
    }

    const newClinica = new Clinica({
      name,
      organitionName,
      image,
      phone1,
      phone2,
      phone3,
      bank,
      bankNumber,
      inn,
      address,
      orientation,
      director,
      mfo,
    })

    await newClinica.save()

    res.status(201).send(newClinica)
  } catch (error) {
    res.status(501).json({ message: error })
  }
}

module.exports.getClinica = async (req, res) => {
  try {
    const { clinicaId } = req.body
    if (!clinicaId) {
      return res.status(400).json({
        message: "Diqqat! Clinica ID si ko'rsatilmagan.",
      })
    }

    const clinica = await Clinica.findById(clinicaId)

    if (!clinica) {
      return res.status(400).json({
        message: "Diqqat! Ko'rsatilgan klinika ro'yxatdan o'tkazilmagan.",
      })
    }

    res.status(200).send(clinica)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}
