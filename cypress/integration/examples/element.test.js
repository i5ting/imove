/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
    cy.get('div.ant-modal-confirm-btns > button:nth-child(1)').click({ force: true })
  })

  function moveNode(selector, x, y) {
    cy.get(selector).eq(0)
      .trigger('mousedown', { which: 1, force: true })
      .trigger('mousemove', { clientX: x, clientY: y, force: true })
      .trigger('mouseup', { force: true })
  }

  // 节点/边操作测试
  it('添加 开始/分支/处理 节点', () => {
    const DEFAULT_COUNT = 1
    moveNode('svg > g > g.x6-graph-svg-stage > g:nth-child(1) > circle', 300, 150)
    moveNode('svg > g > g.x6-graph-svg-stage > g:nth-child(2) > polygon', 400, 150)
    moveNode('svg > g > g.x6-graph-svg-stage > g:nth-child(3) > rect', 500, 150)
    cy.get('svg> g > g.x6-graph-svg-stage circle').its('length').should('be.gt', DEFAULT_COUNT)
    cy.get('svg> g > g.x6-graph-svg-stage polygon').its('length').should('be.gt', DEFAULT_COUNT)
    cy.get('svg> g > g.x6-graph-svg-stage rect').its('length').should('be.gt', DEFAULT_COUNT)
  })

  it('边连线 & 删除节点/边', () => {
    moveNode('svg > g > g.x6-graph-svg-stage > g:nth-child(1) > circle', 300, 150)
    moveNode('svg > g > g.x6-graph-svg-stage > g:nth-child(2) > polygon', 400, 150)
    moveNode('svg > g > g.x6-graph-svg-stage > g:nth-child(3) > rect', 500, 150)
    const node1 = cy.get('svg > g > g.x6-graph-svg-stage > g:nth-child(1)').eq(1)
    const node2 = cy.get('svg > g > g.x6-graph-svg-stage > g:nth-child(2)').eq(1)
    const node3 = cy.get('svg > g > g.x6-graph-svg-stage > g:nth-child(3)').eq(1)
    node1.click('right', { force: true }).trigger('mousemove', { clientX: node2.clientX, clientY: node2.clientY, force: true }).trigger('mouseup', { force: true })
    node2.click('right', { force: true }).trigger('mousemove', { clientX: node3.clientX, clientY: node3.clientY, force: true }).trigger('mouseup', { force: true })
    cy.get('svg path:nth-child(1)').should('exist')
    cy.get('svg path:nth-child(1)').eq(1).click({ force: true })
    cy.get('body').type('{del}')
    cy.get('svg path:nth-child(1)').eq(1).click({ force: true })
    cy.get('body').type('{del}')
  })
})