import assertRevert from 'zeppelin-solidity/test/helpers/assertRevert';

var BasicTokenMock = artifacts.require('BasicTokenMock.sol');

contract('BasicToken', function (accounts) {
  it('should return the correct totalSupply after construction', async function () {
    let token = await BasicTokenMock.new(accounts[0], 100);
    let totalSupply = await token.totalSupply();

    assert.equal(totalSupply, 100);
  });

  it('should return correct balances after transfer', async function () {
    let token = await BasicTokenMock.new(accounts[0], 100);
    await token.transfer(accounts[1], 100);

    let firstAccountBalance = await token.balanceOf(accounts[0]);
    assert.equal(firstAccountBalance, 0);

    let secondAccountBalance = await token.balanceOf(accounts[1]);
    assert.equal(secondAccountBalance, 100);
  });

  it('should throw an error when trying to transfer more than balance', async function () {
    let token = await BasicTokenMock.new(accounts[0], 100);
    await assertRevert(token.transfer(accounts[1], 101));
  });

  it('should throw an error when trying to transfer to 0x0', async function () {
    let token = await BasicTokenMock.new(accounts[0], 100);
    await assertRevert(token.transfer(0x0, 100));
  });
});
