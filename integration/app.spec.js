describe("Forms",  () =>{
    beforeEach(async () => {
        await page.goto('http://localhost:5000');
      });

    it("should display", async () =>{
        await expect(page).toMatchElement('h1', { text: 'prueba' });

    });
});