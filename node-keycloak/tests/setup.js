require("ts-node").register({ files: true, transpileOnly: true });

var chai = require("chai");
chai.use(require("chai-as-promised"));
chai.use(require("sinon-chai"));
chai.use(require("chai-things"));

global.expect = chai.expect;
