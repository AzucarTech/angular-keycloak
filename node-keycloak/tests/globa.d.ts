import Mocha from "mocha";

declare global {
  var expect: Chai.ExpectStatic;
  var sandbox: sinon.SinonSandbox;
}
