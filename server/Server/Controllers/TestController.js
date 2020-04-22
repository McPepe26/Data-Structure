const TestModel = require('../Models/TestModel');

const TestController = {};

TestController.createTest = async (req, res) => {
    let test = req.body;
    let user = req.user;
    let newTest = new TestModel({
        nameTest: test.nameTest,
        groupId: test.groupId,
        user: user._id,
        doIt: test.doIt,
        dateIn: test.dateIn,
        dateOut: test.dateOut,
        hourIn: test.hourIn,
        hourOut: test.hourOut,
        time: test.time,
        questionList: test.questionList,
    });

    try {
        let testDB = await newTest.save();
        if(!testDB){
            return res.json({
                ok: false,
                error: 'No se pudo guardar el exámen'
            });
        }

        return res.json({
            ok: true,
            test: testDB
        })
    }catch(err){
        return res.json({
            ok: false,
            error: err
        });
    }
}

TestController.editTest = async (req, res) => {
    let test = req.body;
    let user = req.user;
    let newTest = new TestModel({
        nameTest: test.nameTest,
        groupId: test.groupId,
        user: user._id,
        doIt: test.doIt,
        dateIn: test.dateIn,
        dateOut: test.dateOut,
        hourIn: test.hourIn,
        hourOut: test.hourOut,
        time: test.time,
        questionList: test.questionList,
    });

    console.log(test)

    try {
        let testDB = await TestModel.findByIdAndUpdate(test._id, test);
        if(!testDB){
            return res.json({
                ok: false,
                error: 'No se pudo editar el exámen'
            });
        }

        return res.json({
            ok: true,
            test: testDB
        })
    }catch(err){
        return res.json({
            ok: false,
            error: err
        });
    }
}

TestController.getTeacherTest = async (req, res) => {
    let user = req.user;
    try{
        let list = await TestModel.find({user: user._id});
        if(!list){
            return res.json({
                ok: true,
                testList: []
            });
        }
    
        return res.json({
            ok: true,
            testList: list
        });
    }catch(err){
        return res.json({
            ok: false,
            error: err
        });
    }
}

TestController.deleteTest = async (req, res) => {
    let user = req.user;
    let id = req.params.id;
    try{
        let testToDelete = await TestModel.findById(id);
        if(testToDelete.user != user._id){
            return res.json({
                ok: false,
                err: {
                    message: 'No tienes permiso de eliminar este exámen'
                }
            });
        }

        testToDelete = await TestModel.findByIdAndRemove(id);

        if(!testToDelete){
            return res.json({
                ok: false,
                err: {
                    message: 'Test no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            test: testToDelete
        })
    }catch(err){
        return res.json({
            ok: false,
            error: err
        });
    }

}

module.exports = TestController;