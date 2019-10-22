const router = require("express").Router();
const { auth, room, programme, hall, block } = require("./controllers")

router.post('/login', auth.login);
router.post('/register', auth.register);

router.get('/hall/:_id', hall.getHall);
router.get('/halls', hall.getHalls);
router.post('/hall', hall.createHall);
router.delete('/hall/:_id', hall.deleteHall);

router.get('/block/:_id', block.getBlock);
router.post('/block', block.createBlock);
router.delete('/block/:_id', block.deleteBlock);

router.post('/room', room.createRoom);
router.delete('/room/:_id', room.deleteRoom);
router.put('/room/register', room.registerRoom);
router.put('/room/unregister', room.unregisterRoom);


//Working with UI
router.get('/programmes', programme.getProgrammes);
router.post('/programme', programme.createProgramme);
router.delete('/programme/:code', programme.deleteProgramme);

module.exports = router;