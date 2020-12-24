/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
    cy.get('div.ant-modal-confirm-btns > button:nth-child(1)').click({ force: true })
  })

  function moveNodeAndSelect() {
    cy.get('svg > g > g.x6-graph-svg-stage > g:nth-child(1)').eq(0)
      .trigger('mousedown', { which: 1, force: true })
      .trigger('mousemove', { clientX: 400, clientY: 300, force: true })
      .trigger('mouseup', { force: true })
    cy.get('svg > g > g.x6-graph-svg-stage > g:nth-child(1)').eq(1).click({ force: true }) // 点击移动到画布中的节点
  }

  function assertEdit(nth, content) {
    moveNodeAndSelect()
    const ele = cy.get(`#rc-tabs-0-panel-basic > div > div:nth-child(${nth}) > button`).eq(0)
    ele.should('have.text', '编 辑')
    ele.click({ force: true })
    cy.get('.ant-modal-content').should('exist')
    cy.get('.ace_content').type(content)
    cy.get('button.ant-btn.ant-btn-primary').eq(0).click({ force: true })
    ele.click({ force: true })
    cy.get('.ace_content').should('contain', content)
  }

  it('修改节点名称', () => {
    moveNodeAndSelect()
    const ele = cy.get('#rc-tabs-0-panel-basic > div > div:nth-child(1) > input').eq(0)
    ele.clear({ force: true })
    ele.type('新的开始')
    ele.should('have.value', '新的开始')
  })
  it('修改节点代码', () => {
    assertEdit(2, 'console.log(1)')
  })
  it('修改投放配置schema', () => {
    assertEdit(3, `"a":1`)
  })
  it('修改npm依赖', () => {
    assertEdit(4, `"@ant-design/icons": "^4.0.6"`)
  })
})