const mongoose = require('mongoose')
const model = require('./model')
const connection = require('./connection')

const tags = [
    new model.Tag({
        name: '广式'
    }),
    new model.Tag({
        name: '主食'
    }),
    new model.Tag({
        name: '干点'
    }),
    new model.Tag({
        name: '甜点'
    }),
    new model.Tag({
        name: '糖水'
    }),
    new model.Tag({
        name: '肉类'
    }),
    new model.Tag({
        name: '鲜嫩'
    }),
    new model.Tag({
        name: '香'
    }),
    new model.Tag({
        name: '麻辣'
    }),
    new model.Tag({
        name: '酸甜'
    }),
    new model.Tag({
        name: '容易吃饱'
    }),
    new model.Tag({
        name: '推荐'
    }),
    new model.Tag({
        name: '收藏'
    }),
    new model.Tag({
        name: '好看'
    }),
    new model.Tag({
        name: '解腻'
    }),
    new model.Tag({
        name: '酥脆'
    }),
    new model.Tag({
        name: '清淡'
    }),
    new model.Tag({
        name: '好吃'
    }),
    new model.Tag({
        name: '口感丰富'
    }),
]

model.Tag.insertMany(tags)

const foods = [
    new model.Food({
        name: '肠粉',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544198904433&di=8f5be829794981af3e0f84d084310aae&imgtype=0&src=http%3A%2F%2Fs1.nuomi.bdimg.com%2Fupload%2Fdeal%2F2014%2F7%2FV_L%2F1466135-66bnzp6xdh-2626473842025937.jpg',
        tags: [tags[0]._id, tags[1]._id],
        description: '肠粉源于广东罗定，目前已在全国传开，按地理（口味）区分较出名的有广州西关肠粉，梅州肠粉，潮州肠粉，云浮河口肠粉，郁南都城肠粉等。'
    }),
    new model.Food({
        name: '蛋挞',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544199223348&di=c137408a9db348ed15f31502ac1f0b24&imgtype=0&src=http%3A%2F%2Fwww.nanhuwang.com%2Fuploads%2Fallimg%2Fc160708%2F14C9E2551RP-K605.jpg',
        tags: [tags[2]._id, tags[3]._id],
        description: '蛋挞是一种以蛋浆做成馅料的西式馅饼。做法是把饼皮放进小圆盆状的饼模中，然后倒入由砂糖及鸡蛋混合而成之蛋浆，然后放入烤炉；烤出的蛋挞外层为松脆之挞皮，内层则为香甜的黄色凝固蛋浆。'
    }),
    new model.Food({
        name: '龟苓膏',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544199418488&di=8cdd30bbd0faa1e9c36e83cf666f1362&imgtype=0&src=http%3A%2F%2Fcdn.k618img.cn%2Fjiankang%2Fyl%2Fmsjt%2F201708%2FW020170807598126923567.jpg',
        tags: [tags[4]._id],
        description: '龟苓膏主要以名贵的鹰嘴龟和土茯苓为原料，再配以生地黄、蒲公英、金银花、菊花等药物精制而成。'
    }),
    new model.Food({
        name: '虾饺',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544199650990&di=21ecfe1b0421f7c1901b61f5157d3941&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsx%2Ftransform%2F20170422%2FIf39-fyepsec0237903.jpg',
        tags: [tags[2]._id, tags[0]._id],
        description: '虾饺是广东地区著名的传统小吃，属粤菜系，虾饺始创于20世纪初广州市郊伍村五凤乡的一间家庭式小茶楼，已经有百年历史。'
    }),
    new model.Food({
        name: '萝卜糕',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544199943653&di=c38198ce2f672d25786fec5781a08114&imgtype=0&src=http%3A%2F%2Fstatic.i3.xywy.com%2Fcms%2F20150124%2F6bcb1c51abd1dc571ee2cf4a09ee179498413.jpg',
        tags: [tags[2]._id, tags[3]._id],
        description: '萝卜糕是中式传统的糕点，在福建闽南、广东等地区的传统特色糕点。'
    }),
    new model.Food({
        name: '干炒牛河',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544200136560&di=2ea1e745b48693d0a7a8f2daf07ac080&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F0df431adcbef7609de9e78a625dda3cc7cd99e76.jpg',
        tags: [tags[0]._id, tags[1]._id],
        description: '干炒牛河是一道由芽菜、河粉、牛肉等材料制作而成的粤菜。广东地区的特色传统小吃之一。'
    }),
    new model.Food({
        name: '烧卖',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544200307576&di=8940cea3a72d7c46fba872fb8916af1a&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180114%2F84735f82e60d4cdda5bf8254d45f38b5.jpeg',
        tags: [tags[0]._id, tags[2]._id],
        description: '烧卖，又称烧麦、肖米、稍麦，是一种以烫面为皮，包裹肉馅上笼蒸熟的中国传统面食，元代已有记载。'
    }),
    new model.Food({
        name: '蒸凤爪',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544200547058&di=ef183388622aba227bd4340b9b38bea8&imgtype=0&src=http%3A%2F%2Fimg.360500.com%2F2017%2F1226%2F400772%2F1712261510006341.jpg',
        tags: [tags[0]._id, tags[2]._id],
        description: '蒸凤爪是以凤爪，开水，油，冷水，生抽，老抽为主要食材制作而成的食物。'
    }),
    new model.Food({
        name: '云吞',
        img: 'http://t-img.hoto.cn/recipe1/pic/step/l/f3/54/5592307.jpg',
        tags: [tags[0]._id, tags[1]._id],
        description: '云吞又称扁食，是两广地区的特色传统小吃的一种，属于粤菜系。不同于大部分南方地区的“馄饨”，初期被归类为饼类之中。 之所以叫云吞， 是因为粤语中馄饨的发音类似于云吞。'
    }),
    new model.Food({
        name: '白切鸡',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544200999075&di=b991514ca9ca98a08298b9a48c6af383&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Fsmccloud%2F2015%2F06%2F22%2F143495544930293960.JPEG',
        tags: [tags[0]._id, tags[5]._id],
        description: '白切鸡又叫白斩鸡，是粤菜系鸡肴中最普通的一种，属浸鸡类。其特点为制作简易，刚熟不烂，不加配料且保持原味。白切鸡皮爽肉滑，清淡鲜美，驰名粤港澳。'
    })
]

model.Food.insertMany(foods)

// const user = new model.User({
//     id: '1',
//     favorite: [foods[0]._id],
//     tag: [tags[0]._id]
// })

// user.save()

// const comment = new model.Comment({
//     userId: '1',
//     food: foods[0]._id,
//     rate: 4,
//     detail: '这是一条评论',
//     tags: [tags[0]._id]
// })

// comment.save()