import {expect, test} from '@oclif/test'

describe('test-watch', () => {
  test
  .stdout()
  .command(['test-watch'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['test-watch', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
