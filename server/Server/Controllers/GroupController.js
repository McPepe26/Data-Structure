const Group = require('../Models/GroupModel');
const generate = require('../Helpers/CodeGenerator');
const GroupController = {};

GroupController.createGroup = (req, res) => {
    let content = req.body;

    let newGroup = new Group({
        groupName: content.groupName,
        public: !content.public,
        user: req.user._id,
        code: generate(content.groupName)
    });

    newGroup.save((err, groupDB) => {
        if(err){
            return res.json({
                ok: false,
                error: err
            });
        }

        return res.json({
            ok: true,
            group: groupDB
        })
    });
}

GroupController.getAllGroupsByUser = async (req, res) => {
    let user = req.user;
    try{
        let groupList = await Group.find({user: user._id});
        let groupListPublic = await Group.find({user: {$ne : user._id }});

        return res.json({
            ok: true,
            groupList,
            groupListPublic
        })
    }catch(err) {
        return res.json({
            ok: false,
            error: err
        });
    }
}

GroupController.deleteGroup = async (req, res) => {
    let id = req.params.id;
    let user = req.user;
    try{
        let groupDelete = await Group.findById(id);

        if(user._id != groupDelete.user){
            return res.json({
                ok: false,
                err: {
                    message: 'No tienes permiso de eliminar este grupo'
                }
            });
        }

        groupDelete = await Group.findByIdAndRemove(id);

        if(!groupDelete){
            return res.json({
                ok: false,
                err: {
                    message: 'Grupo no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            groupDelete
        })

    }catch(err){
        return res.json({
            ok: false,
            error: err
        });
    }
}

module.exports = GroupController;