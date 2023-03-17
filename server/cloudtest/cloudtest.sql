/*
 Navicat Premium Data Transfer

 Source Server         : cenyu
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : cloudtest

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 16/03/2023 17:18:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for addrs
-- ----------------------------
DROP TABLE IF EXISTS `addrs`;
CREATE TABLE `addrs`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL COMMENT '用户的id',
  `addrid` int NOT NULL,
  `province` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `city` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `area` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `detailsAddr` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `tel` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of addrs
-- ----------------------------
INSERT INTO `addrs` VALUES (1, 1, 1, '贵州省', '晴隆', '鸡场镇', '默默模', '18888888888');
INSERT INTO `addrs` VALUES (2, 1, 2, '贵州省', '晴隆', '鸡场镇', '某某街道', '18885555888');
INSERT INTO `addrs` VALUES (3, 2, 1, '贵州省', '遵义', '某某镇', '12345222', '18888888888');
INSERT INTO `addrs` VALUES (4, 8, 1, '岑宇', '贵州神', '黔西南', '晴隆县', '66666666666');

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car`  (
  `id` int NOT NULL,
  `userid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `goodsid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of car
-- ----------------------------
INSERT INTO `car` VALUES (1, '1', '1');
INSERT INTO `car` VALUES (2, '1', '4');
INSERT INTO `car` VALUES (3, '1', '6');
INSERT INTO `car` VALUES (4, '1', '2');

-- ----------------------------
-- Table structure for commits
-- ----------------------------
DROP TABLE IF EXISTS `commits`;
CREATE TABLE `commits`  (
  `id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `userid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `goodsid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `inuserid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `context` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `time` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `star` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of commits
-- ----------------------------
INSERT INTO `commits` VALUES ('1', '1', '4', '0', '嗯嗯呢', '10/3/2023', '2', '岑宇', '00000000000');
INSERT INTO `commits` VALUES ('2', '1', '2', '0', '啊。北京实我向往的地界', '6/3/2023', '4', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('3', '1', '4', '0', '好额，想吃东西', '13/3/2023', '2', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('4', '1', '4', '0', '好的好的，听你的', '13/3/2023', '4', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('5', '1', '4', '0', '可以吗，我可以进门吗？', '13/3/2023', '3', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('6', '1', '4', '0', '可以可以', '13/3/2023', '2', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('7', '1', '4', '0', '哦空空空空哦哦哦看', '13/3/2023', '3', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('8', '1', '4', '0', '和杀杀杀', '13/3/2023', '5', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('9', '1', '4', '0', '我要五杀1哦', '13/3/2023', '3', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('10', '1', '4', '0', '好吗，你这样', '13/3/2023', '2', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('11', '1', '4', '0', '你好陌生人', '13/3/2023', '3', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('12', '1', '4', '0', '我', '13/3/2023', '4', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('13', '1', '4', '0', '哦空空', '13/3/2023', '1', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('14', '1', '4', '0', '藕孔口口口口口哦空空空空', '13/3/2023', '2', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('15', '1', '4', '0', '你争夺是', '13/3/2023', '4', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('16', '1', '4', '0', '哦空哦哦空哦看yyyyy', '13/3/2023', '3', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('17', '1', '4', '0', '资金到就行哈哈哈哈哈', '13/3/2023', '3', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('18', '1', '4', '0', '111111111111', '13/3/2023', '4', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('19', '1', '4', '0', '88888888', '13/3/2023', '3', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('20', '1', '4', '0', '你好，岑岑毓', '13/3/2023', '1', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('21', '1', '4', '0', '耦合', '13/3/2023', '1', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('22', '1', '4', '0', '你想说啥就说呀', '13/3/2023', '2', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('23', '1', '4', '0', '但半夜不说话', '14/3/2023', '0', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('24', '1', '4', '0', '比你好看', '15/3/2023', '3', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('25', '1', '1', '0', '好的你好', '15/3/2023', '2', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('26', '1', '1', '0', '藕孔藕孔扣扣', '15/3/2023', '3', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('27', '1', '1', '0', '藕孔哦空空', '15/3/2023', '0', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('28', '1', '1', '0', '好的', '15/3/2023', '2', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('29', '1', '1', '0', '你在说啥', '15/3/2023', '2', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('30', '1', '1', '0', '你在想皮尺', '15/3/2023', '5', '岑宇', '55555555555');
INSERT INTO `commits` VALUES ('31', '1', '1', '0', '介绍一下你在即', '15/3/2023', '4', '岑宇', '55555555555');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '商品名称',
  `city` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '商品地址市级',
  `type` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '商品类型',
  `details` varchar(1024) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '商品描述',
  `price` decimal(10, 2) NOT NULL COMMENT '商品价格',
  `count` int NOT NULL COMMENT '商品库存',
  `imgurl` varchar(1024) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '商品图片',
  `company` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '商品地址公司',
  `area` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '商品地址区级',
  `material` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '商品制作材料',
  `height` double(10, 2) NULL DEFAULT NULL COMMENT '商品高度',
  `sales` int NULL DEFAULT NULL COMMENT '销售量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, '美式台灯', '广州', '美式', '美式长臂LED台灯工作护眼绘图插电式折叠伸缩主播美颜直播补光灯', 80.00, 408, 'https://img.pddpic.com/mms-material-img/2023-03-06/ade3ba7f-a80f-48c3-b814-a64ee5e54845.jpeg?imageView2/2/w/1300/q/80/format/webp', '万家明', '东莞', '金属、玻璃', 50.00, 112);
INSERT INTO `goods` VALUES (2, '饭桌', '广州', '轻奢', '轻奢岩板餐桌椅组合网红小户型出租屋餐厅家用吃饭桌子长方形饭桌', 1980.00, 100, 'https://img.pddpic.com/mms-material-img/2022-08-29/31d15d81-7831-4e2e-937f-9f133755d7f0.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '明亚办公家具', '黄浦区', '人造板', 120.00, 200);
INSERT INTO `goods` VALUES (3, '简约办公桌', '广州', '简约现代', '电脑桌台式简易书桌家用卧室学习桌学生小课桌简约长方形办公桌子', 0.00, 100, 'https://review.pddpic.com/review3/review/2022-11-13/3e868b71-9461-48fa-8001-f7540e3004a0.jpeg?imageView2/2/w/1300/q/80', '旗舰店', '天河区', '人造板（密度板/纤维板）', 100.00, 100);
INSERT INTO `goods` VALUES (4, '圆角电脑桌', '广州', '简约现代', '圆角电脑桌台式家用学生学习桌写字台简约书桌长方形卧室办公桌子', 90.00, 1000, 'https://img.pddpic.com/mms-material-img/2023-03-08/6d4f3a12-be04-42f3-ba2b-ecfa5151b74e.jpeg?imageView2/2/w/1300/q/80/format/webp', '旗舰店', '珠海区', '其他', 110.00, 50);
INSERT INTO `goods` VALUES (5, '大衣柜', '广州', '简约现代', '衣柜欧式现代简约网红轻奢小户型家用卧室四门五六门组合大衣橱', 987.00, 999, 'https://img.pddpic.com/mms-material-img/2022-05-27/a821976d-4ebd-4d43-85c0-7a282eca1715.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '旗舰店', '天河区', '人造板（刨花板/三聚氰胺板）', 200.00, 99);
INSERT INTO `goods` VALUES (6, '卧室衣柜', '广州', '对开门', '衣柜家用卧室对开门衣服柜现代简约小户型组合储物柜子定制大衣橱', 2000.00, 299, 'https://img.pddpic.com/mms-material-img/2023-02-24/cbc31d01-9a00-4d6e-9dde-d340e2a44692.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '五行店铺', '花都区', '人造板（刨花板/三聚氰胺板）', 230.00, 89);
INSERT INTO `goods` VALUES (7, '户外桌椅', '广州', '简约现代', '户外桌椅创意岩板餐桌组合家用庭院别墅简约室外花园无扶手藤编椅', 2280.00, 1000, 'https://img.pddpic.com/open-gw/2023-02-21/bc0eee15ef1a38914096c9bdadbd9d0e.jpeg?imageView2/2/w/1300/q/80/format/webp', '元店', '顺德区', '藤', 110.00, 9);
INSERT INTO `goods` VALUES (8, '置物架', '广州', '落地', '产品展示柜超市货架货柜鞋店展架化妆品美容陈列柜置物架带门', 2999.00, 801, 'https://img-2.pddpic.com/openapi/images/2019-08-28/4d52289ec24ebb0a5d8d898dd382af84.jpg?imageView2/2/w/1300/q/80/format/webp', '沧源店', '天河区', '人造板', 200.00, 199);
INSERT INTO `goods` VALUES (9, '实木置物架', '广州', '挂墙', '实木一字隔板免打孔北欧层板墙壁挂墙面搁板电视墙装饰墙上置物架', 199.00, 200, 'https://img.pddpic.com/mms-material-img/2021-07-26/0e5274e7-c55f-4bf4-9d30-83671784261d.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '苍澜殿', '珠海区', '人造板', 5.00, 299);
INSERT INTO `goods` VALUES (10, '正宗章丘铁锅', '广州', '传统', '正宗章丘铁锅官方旗舰纯手工锻打老式铁锅炒菜锅不粘锅无涂层家用', 80.00, 60, 'https://img.pddpic.com/mms-material-img/2022-10-08/b335af70-5c63-493c-bf4a-8cd763784d24.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '大锅店', '花都区', '熟铁', 10.00, 19);
INSERT INTO `goods` VALUES (11, '橱柜', '广州', '组装', '橱柜家用简易不锈钢厨房灶台柜厨柜一体储物柜子整体组装经济型', 168.00, 1000, 'https://img.pddpic.com/mms-material-img/2022-08-07/c990f0bc-d6a7-4085-81f5-ecdc7d22b268.png.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '安逸家具', '珠海区', '金属（不锈钢）', 100.00, 99);
INSERT INTO `goods` VALUES (12, '花盆', '广州', '古典', '防腐木花箱户外庭院组合长方形碳化实木花盆特大号阳台种菜种植箱', 500.00, 1999, 'https://img.pddpic.com/mms-material-img/2023-03-06/e0d139e4-736f-41d7-bf60-a50d222ca36b.jpeg?imageView2/2/w/1300/q/80/format/webp', '家具精品店', '黄浦区', '实木', 100.00, 288);
INSERT INTO `goods` VALUES (13, 'TCL电视', '广州', '挂墙', 'TCL电视 55英寸Mini LED量子点广色域4K 120Hz智能液晶平板电视机', 5499.00, 208, 'https://img.pddpic.com/mms-material-img/2022-12-12/6652556c-8fee-4414-926c-2980b67f67e5.jpeg?imageView2/2/w/1300/q/80/format/webp', 'TCL', '东莞', '金属、塑料', 100.00, 99);
INSERT INTO `goods` VALUES (14, '美的空调', '广州', '立式', '美的空调大3匹2匹柜机立式变频1级冷暖两用节能客厅家用锐静', 3899.00, 299, 'https://img.pddpic.com/mms-material-img/2022-03-22/c0665eb3-f1fd-4136-a378-ad8f967772a1.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '美的', '顺德区', '金属（不锈钢）', 150.00, 89);
INSERT INTO `goods` VALUES (15, '全能扫地机器人', '广州', '冷峻黑', '科沃斯X1OMNI全能扫地机器人家用智能吸尘器集尘扫拖洗一体官翻机', 2899.00, 99, 'https://img.pddpic.com/mms-material-img/2023-02-09/81a81ee8-ec6c-42eb-bca1-a15717c4d5bc.jpeg?imageView2/2/w/1300/q/80/format/webp', '科沃斯', '天河区', '金属、塑料', 50.00, 12);
INSERT INTO `goods` VALUES (16, '洗地机', '广州', '强吸力', '海尔家用智能洗地机无线吸洗拖一体电解除菌拖把吸尘器', 1383.00, 245, 'https://img.pddpic.com/mms-material-img/2023-02-28/0811a831-6f18-4c83-8f4d-4bb7a6eabf78.jpeg?imageView2/2/w/1300/q/80/format/webp', '海尔', '珠海去', '金属、塑料', 150.00, 255);
INSERT INTO `goods` VALUES (17, '美的冰箱', '广州', '对开门', '美的480升十字对开门一级无霜双变频双循环节能家用智能超薄冰箱', 2929.00, 1889, 'https://img.pddpic.com/mms-material-img/2022-08-22/1a447de6-828a-4a08-9443-bfc5024667a0.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '美的', '天河区', '金属（不锈钢）', 220.00, 899);
INSERT INTO `goods` VALUES (18, '海尔冰箱', '广州', '对开门', '海尔冰箱家用双开门白色对开门510升风冷无霜大容量双变频净味528', 2555.00, 888, 'https://img.pddpic.com/mms-material-img/2023-02-28/bdb8f27c-aa2a-4229-84be-86f9d0fbb089.jpeg?imageView2/2/w/1300/q/80/format/webp', '海尔', '天河区', '金属、塑料', 200.00, 123);
INSERT INTO `goods` VALUES (19, '轻奢电视柜', '广州', '落地', '轻奢电视柜背景墙一体组合墙柜客厅收纳储物柜多功能电视机柜定制', 500.00, 19, 'https://img.pddpic.com/mms-material-img/2022-12-10/07e59053-a729-4d73-9e26-2529d2665196.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '联想', '珠海区', '人造板', 180.00, 88);
INSERT INTO `goods` VALUES (20, '水晶吊灯', '广州', '欧式', '欧式客厅大灯水晶吊灯客厅灯简约现代大气2022新款陶瓷灯具套餐', 500.00, 9, 'https://img.pddpic.com/mms-material-img/2022-05-18/b3f14908-95e9-40ef-b37d-6e3e17b9816f.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '安逸家具', '天河区', '玻璃、耐高温灯丝', 200.00, 999);
INSERT INTO `goods` VALUES (21, '锌合金别墅大门', '广州', '双开', '锌合金别墅大门双开门仿铜家用入户门农村自建房乡村庭院进户门', 5000.00, 20, 'https://img.pddpic.com/mms-material-img/2023-02-22/d67d3132-f98b-4a84-837c-e58a37ae444a.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '安逸家具', '天河区', '锌合金、红木', 250.00, 99);

-- ----------------------------
-- Table structure for goods_imgs
-- ----------------------------
DROP TABLE IF EXISTS `goods_imgs`;
CREATE TABLE `goods_imgs`  (
  `id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `goodsid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods_imgs
-- ----------------------------
INSERT INTO `goods_imgs` VALUES ('1', 'https://img.pddpic.com/mms-material-img/2023-03-06/ade3ba7f-a80f-48c3-b814-a64ee5e54845.jpeg?imageView2/2/w/1300/q/80/format/webp', '3');
INSERT INTO `goods_imgs` VALUES ('2', 'https://img.pddpic.com/mms-material-img/2023-03-06/d8c73a73-53ad-4b99-9d72-6053763d1058.jpeg?imageView2/2/w/1300/q/80/format/webp', '3');
INSERT INTO `goods_imgs` VALUES ('3', 'https://img.pddpic.com/mms-material-img/2023-03-06/205c6db6-9ee4-4085-8857-6c122b693b5e.jpeg?imageView2/2/w/1300/q/80/format/webp', '3');
INSERT INTO `goods_imgs` VALUES ('4', 'https://review-2.pddpic.com/review3/review/2023-03-09/7c00558d558c70da3713f901cbb7c60f.jpeg?imageView2/2/w/1300/q/80/format/webp', '4');
INSERT INTO `goods_imgs` VALUES ('5', 'https://img.pddpic.com/mms-material-img/2023-03-08/e7ee7066-f1b0-4539-87b9-a1689ad7d53a.jpeg?imageView2/2/w/1300/q/80/format/webp', '4');
INSERT INTO `goods_imgs` VALUES ('6', 'https://img.pddpic.com/mms-material-img/2023-03-08/a6f57c59-b727-4147-b6be-30b1e3268582.jpeg?imageView2/2/w/1300/q/80/format/webp', '4');
INSERT INTO `goods_imgs` VALUES ('7', 'https://img.pddpic.com/mms-material-img/2023-03-08/f6235f01-1a30-43e0-9d43-94afce949ef7.jpeg?imageView2/2/w/1300/q/80/format/webp', '4');
INSERT INTO `goods_imgs` VALUES ('8', 'https://img.pddpic.com/mms-material-img/2022-11-04/13dbe75c-59df-4386-a362-ec51fab84284.jpeg?imageView2/2/w/1300/q/80/format/webp', '1');
INSERT INTO `goods_imgs` VALUES ('9', 'https://img.pddpic.com/mms-material-img/2022-11-04/5641a233-cfdc-40c2-85a9-0f5d03b88d86.jpeg?imageView2/2/w/1300/q/80/format/webp', '1');
INSERT INTO `goods_imgs` VALUES ('10', 'https://img.pddpic.com/mms-material-img/2022-08-29/3cf8b269-7595-4061-9436-68c209bddacc.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '2');
INSERT INTO `goods_imgs` VALUES ('11', 'https://img.pddpic.com/mms-material-img/2022-08-29/296b6f25-24de-4751-a2e6-6deb0ac411f9.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '2');
INSERT INTO `goods_imgs` VALUES ('12', 'https://img.pddpic.com/mms-material-img/2022-08-29/b70fc722-c0fd-47ab-a879-e0f4a5448001.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '2');
INSERT INTO `goods_imgs` VALUES ('13', 'https://img.pddpic.com/mms-material-img/2022-05-27/7db41334-d675-457c-b60b-016bc902f181.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '5');
INSERT INTO `goods_imgs` VALUES ('14', 'https://img.pddpic.com/mms-material-img/2022-05-31/f85850ee-3904-4d57-9343-84bab84baa56.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '5');
INSERT INTO `goods_imgs` VALUES ('15', 'https://commimg.pddpic.com/garner-api/b97a5d7ef228cf87a64774dbd687ea46.jpeg?imageView2/2/w/1300/q/80/format/webp', '5');
INSERT INTO `goods_imgs` VALUES ('16', 'https://img.pddpic.com/mms-material-img/2022-05-27/6c5c5ee4-4e91-4d51-babc-db1c5b4fb9d7.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '5');
INSERT INTO `goods_imgs` VALUES ('17', 'https://img.pddpic.com/mms-material-img/2023-02-24/b4fe7e55-d3b1-4a0d-9b27-40c1ad5332e0.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '6');
INSERT INTO `goods_imgs` VALUES ('18', 'https://img.pddpic.com/mms-material-img/2023-02-24/accc7b9f-302b-4299-847b-110730104ea3.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '6');
INSERT INTO `goods_imgs` VALUES ('19', 'https://img.pddpic.com/mms-material-img/2023-03-01/46ac65e3-fd64-4139-a770-e35ccb7721af.jpeg?imageView2/2/w/1300/q/80/format/webp', '6');
INSERT INTO `goods_imgs` VALUES ('20', 'https://img.pddpic.com/open-gw/2023-02-21/3b7554c4c98aafe2f4336f59a87d9429.jpeg?imageView2/2/w/1300/q/80/format/webp', '7');
INSERT INTO `goods_imgs` VALUES ('21', 'https://img.pddpic.com/open-gw/2023-02-21/e3a9537a0b532c0fef1636862b504edd.jpeg?imageView2/2/w/1300/q/80/format/webp', '7');
INSERT INTO `goods_imgs` VALUES ('22', 'https://img.pddpic.com/goods/images/2020-04-09/a082f42a-c6de-435f-9967-24bd0fe4ce86.jpg?imageView2/2/w/1300/q/80/format/webp', '8');
INSERT INTO `goods_imgs` VALUES ('23', 'https://img.pddpic.com/goods/images/2020-05-16/b51aaa81-d7ed-420b-b3ef-6f130eed48ea.jpg?imageView2/2/w/1300/q/80/format/webp', '8');
INSERT INTO `goods_imgs` VALUES ('24', 'https://img.pddpic.com/mms-material-img/2021-07-26/0e27466f-09a7-4eba-91e2-066a429a01e7.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '9');
INSERT INTO `goods_imgs` VALUES ('25', 'https://img.pddpic.com/mms-material-img/2021-07-26/bf114572-4902-4d46-8552-9e9db7f32aeb.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '9');
INSERT INTO `goods_imgs` VALUES ('26', 'https://img.pddpic.com/mms-material-img/2021-07-26/0e5274e7-c55f-4bf4-9d30-83671784261d.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '9');
INSERT INTO `goods_imgs` VALUES ('27', 'https://img.pddpic.com/mms-material-img/2022-10-08/c8f68be0-c18c-4998-b9bb-f138b0e1a219.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '10');
INSERT INTO `goods_imgs` VALUES ('28', 'https://img.pddpic.com/mms-material-img/2022-10-08/4690e9b4-dacd-44b1-8605-8e5921f79dee.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '10');
INSERT INTO `goods_imgs` VALUES ('29', 'https://img.pddpic.com/mms-material-img/2022-10-08/90d0eed6-ce7c-48a0-9dd5-48d6477fdfab.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '10');
INSERT INTO `goods_imgs` VALUES ('30', 'https://img.pddpic.com/mms-material-img/2022-08-07/03ff19f0-0b63-4268-bc27-2f8eaf86846e.png.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '11');
INSERT INTO `goods_imgs` VALUES ('31', 'https://img.pddpic.com/mms-material-img/2022-08-07/d4a93ef6-05d6-42d7-91a2-5a11ae583ad3.png.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '11');
INSERT INTO `goods_imgs` VALUES ('32', 'https://img.pddpic.com/mms-material-img/2022-08-14/2f907d38-c7b1-407c-bf58-db0f19a9c57e.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '11');
INSERT INTO `goods_imgs` VALUES ('33', 'https://commimg.pddpic.com/garner-api/c1be7af4366cbe9221409e6640e74d0f.jpeg?imageView2/2/w/1300/q/80/format/webp', '12');
INSERT INTO `goods_imgs` VALUES ('34', 'https://img.pddpic.com/mms-material-img/2023-03-06/aa79c3b1-bd5b-43f2-851f-4ec793affe5b.jpeg?imageView2/2/w/1300/q/80/format/webp', '12');
INSERT INTO `goods_imgs` VALUES ('35', 'https://img.pddpic.com/mms-material-img/2022-12-12/8eb1a806-ff53-4369-b388-8544b2f79f9c.jpeg?imageView2/2/w/1300/q/80/format/webp', '13');
INSERT INTO `goods_imgs` VALUES ('36', 'https://img.pddpic.com/mms-material-img/2022-12-12/54c8c90c-1bcb-49b1-90f0-4e4d4b991689.jpeg?imageView2/2/w/1300/q/80/format/webp', '13');
INSERT INTO `goods_imgs` VALUES ('37', 'https://img.pddpic.com/mms-material-img/2022-12-12/85455f5d-566c-49fd-a8c4-681f3cb15e0b.jpeg?imageView2/2/w/1300/q/80/format/webp', '13');
INSERT INTO `goods_imgs` VALUES ('38', 'https://img.pddpic.com/mms-material-img/2022-12-12/84c0aaf5-ff62-423d-a5ff-e13507806edb.jpeg?imageView2/2/w/1300/q/80/format/webp', '13');
INSERT INTO `goods_imgs` VALUES ('39', 'https://img.pddpic.com/mms-material-img/2022-03-22/3b140e53-c00b-4678-ac68-1c880338edc1.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '14');
INSERT INTO `goods_imgs` VALUES ('40', 'https://img.pddpic.com/mms-material-img/2022-03-22/50fa343b-5ce1-4a3c-8b04-cd433a1c7aee.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '14');
INSERT INTO `goods_imgs` VALUES ('41', 'https://img.pddpic.com/mms-material-img/2023-03-12/d04cc296-645a-46fe-b7d7-61411cd4f251.png.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '14');
INSERT INTO `goods_imgs` VALUES ('42', 'https://commimg.pddpic.com/garner-api/8e36495057de860dd2885503705e0fad.jpeg?imageView2/2/w/1300/q/80/format/webp', '15');
INSERT INTO `goods_imgs` VALUES ('43', 'https://commimg.pddpic.com/garner-api/dd05cb6040eed90537359dc4ba7081da.jpeg?imageView2/2/w/1300/q/80/format/webp', '15');
INSERT INTO `goods_imgs` VALUES ('44', 'https://img.pddpic.com/mms-material-img/2023-02-28/8b9d459c-e277-436f-93f0-ce420b01009b.jpeg?imageView2/2/w/1300/q/80/format/webp', '16');
INSERT INTO `goods_imgs` VALUES ('45', 'https://img.pddpic.com/mms-material-img/2022-08-22/0853d9d8-bb32-4306-8735-9eca14ece474.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '17');
INSERT INTO `goods_imgs` VALUES ('46', 'https://img.pddpic.com/mms-material-img/2022-08-22/ee6c2efe-0fba-46e1-a376-4c86e0f24759.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '17');
INSERT INTO `goods_imgs` VALUES ('47', 'https://img.pddpic.com/mms-material-img/2022-06-01/abaed401-40eb-4413-a009-78542c9fc841.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '18');
INSERT INTO `goods_imgs` VALUES ('48', 'https://img.pddpic.com/mms-material-img/2022-06-01/c20a38b0-e3fd-4a44-99bc-86979d7a8541.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '18');
INSERT INTO `goods_imgs` VALUES ('49', 'https://img.pddpic.com/mms-material-img/2022-06-01/40e5c398-e528-473f-92d7-d7c72c8b7b02.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '18');
INSERT INTO `goods_imgs` VALUES ('50', 'https://img.pddpic.com/mms-material-img/2023-02-06/1340cfbd-c802-477a-a096-7e19c9d15c58.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '19');
INSERT INTO `goods_imgs` VALUES ('51', 'https://img.pddpic.com/mms-material-img/2022-12-10/dcc4dfff-c00d-4fc6-b568-00c992bc079d.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '19');
INSERT INTO `goods_imgs` VALUES ('52', 'https://img.pddpic.com/mms-material-img/2022-08-22/a83b70ca-5040-493c-b745-406cd190bfb3.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '20');
INSERT INTO `goods_imgs` VALUES ('53', 'https://img.pddpic.com/mms-material-img/2022-05-18/64c98b08-5a16-4e96-a366-2b6cd33486d6.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '20');
INSERT INTO `goods_imgs` VALUES ('54', 'https://img.pddpic.com/mms-material-img/2023-02-22/149b7051-80e1-4841-a989-78b2a7aea883.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '21');
INSERT INTO `goods_imgs` VALUES ('55', 'https://img.pddpic.com/mms-material-img/2023-02-22/00766e1d-28fd-4e34-9f0f-2f902320cb4c.jpeg.a.jpeg?imageView2/2/w/1300/q/80/format/webp', '21');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderid` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '订单编号（AY+时间（年月日时分秒））',
  `status` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '订单状态',
  `goodsid` int NOT NULL COMMENT '商品id',
  `goodsname` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '商品名称',
  `goodsaddr` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '发货地址',
  `payprice` decimal(10, 2) NOT NULL COMMENT '支付价格（商品单价乘以数量）',
  `count` int NOT NULL COMMENT '商品数量',
  `orderprice` decimal(10, 2) NOT NULL COMMENT '商品单价',
  `userid` int NOT NULL COMMENT '用户id',
  `tel` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '联系电话',
  `useraddr` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '收获地址',
  `username` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '下单的人',
  `imgurl` varchar(1024) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '商品图片连接',
  `remark` varchar(1024) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '备注',
  `company` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '店名',
  `type` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '商品的类型型号等',
  `material` varchar(1024) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '制作商品的材料',
  `height` double(20, 2) NULL DEFAULT NULL COMMENT '商品的高度数据（cm）',
  `city` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '商品发货的城市',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 90 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for shoucang
-- ----------------------------
DROP TABLE IF EXISTS `shoucang`;
CREATE TABLE `shoucang`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户id',
  `goodsid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '商品id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shoucang
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id主键',
  `username` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '密码',
  `roleid` int NULL DEFAULT NULL COMMENT '用户身份（1：管理员，2：普通用户）',
  `age` int NULL DEFAULT NULL COMMENT '用户年龄',
  `tel` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户电话',
  `sex` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户性别',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '岑宇', '123', 1, 24, '13217427986', '男');
INSERT INTO `users` VALUES (2, 'cenyu', '123', 0, 2, '00000000000', '未知');
INSERT INTO `users` VALUES (3, '岑那你1', '123', 0, 2, '00000000000', '未知');
INSERT INTO `users` VALUES (4, '岑那你3', '123', 0, 2, '00000000000', '未知');
INSERT INTO `users` VALUES (5, '岑那你2', '1234', 0, 2, '00000000000', '未知');
INSERT INTO `users` VALUES (6, '岑那4', '1234', 0, 2, '00000000000', '未知');
INSERT INTO `users` VALUES (7, '岑那你5', '1111', 0, 2, '00000000000', '未知');
INSERT INTO `users` VALUES (8, '岑宇5', '123', 0, 24, '55555555555', '男');
INSERT INTO `users` VALUES (9, '岑宇7', '123', 0, 0, '00000000000', '未知');

SET FOREIGN_KEY_CHECKS = 1;
