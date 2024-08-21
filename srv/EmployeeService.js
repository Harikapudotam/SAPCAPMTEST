const cds = require('@sap/cds');
module.exports = cds.service.impl( async function(){

    const {EmployeeSet} = this.entities;

    this.before('CREATE',EmployeeSet,(req) => {
      var salary = parseInt(req.data.salaryAmount);
      var curr = req.data.Currency_code;
      if((salary >= 50000) && (curr==='USD') ){
          req.error('‘Employee’s salary must be less than 50000 USD');
      }
      if((salary < 50000) && (curr!=='USD')){
        req.error('Please USD ONly');

      }
     
  })
  this.after('CREATE', EmployeeSet, (each) => {
      console.log('Create Operation Successful');
      each.message = 'Create Operation Successful';
  })

    this.before('UPDATE',EmployeeSet,(req,res)=>{
      var salary = parseInt(req.data.salaryAmount);
      
      if(salary>50000){
        req.error(500,'Employee’s salary must be less than 50000 USD')
      }
      var name_fr = req.data.nameFirst;
      if (name_fr!==null){
      //     req.error(500,'Operation not allowed');
      // }
      var name_fr2 = req.data.loginName;
      if (name_fr2!==null){
        req.error(500,'Operation not allowed');
    }
  }

    }) //--working ok
    // this.on('UPDATE',EmployeeSet,(req,res)=>{
    //   var name_fr = req.data.nameFirst;
    //   if (name_fr!== null){
    //       req.error(500,'Operation not allowed');
    //   }
    // })
    this.after('UPDATE', EmployeeSet, (each) => {
      console.log('Update Operation Successful');
      each.message = 'Update Operation Successful';
  })

    // Handler for the UPDATE operation
    // this.on('UPDATE', EmployeeSet, async (req) => {
    //     try {
    //         const data = req.data;
    //         const ID = req.params[0].ID;

    //         // Fetch the current record to compare
    //         const currentRecord = await SELECT.one.from(EmployeeSet).where({ ID });

    //         if (!currentRecord) {
    //             req.error(404, 'User not found');
    //         }

    //         // Check if nameFirst or loginName are being changed
    //         if (data.nameFirst && data.nameFirst !== currentRecord.nameFirst) {
    //             req.error(400, 'Operation not allowed');
    //         }
    //         if (data.loginName && data.loginName !== currentRecord.loginName) {
    //             req.error(400, 'Operation not allowed');
    //         }

    //         // Perform the update
    //         console.log('Update operation successful');
    //         await UPDATE(Users).set(data).where({ ID });

    //         // Print success message to the console
           

    //         return; // Return the result or response if needed

    //     } catch (err) {
    //         console.error('Error during update operation:', err);
    //         req.error(500, 'Internal server error');
    //     }
    // });

    this.on('DELETE',EmployeeSet,async(req)=>{
      try {
        const ID = req.params[0].ID;

        // Fetch the record to validate
        const record = await SELECT.one.from(EmployeeSet).where({ ID });

        if (!record) {
            return req.error(404, 'Employee not found');
        }

        // Safeguard: Check if nameFirst exists and is a string
        const nameFirst = record.nameFirst;
        if (nameFirst && typeof nameFirst === 'string' && nameFirst.startsWith('S')) {
            return req.error(401, 'Delete operation not allowed for employees with nameFirst starting with "S"');
        }
    } catch (err) {
        console.error('Error during pre-delete validation:', err);
        req.error(500, 'Internal server error');
    }
    })
    this.after('DELETE', EmployeeSet, (each) => {
      console.log('Delete Operation Successful');
      each.message = 'Delete Operation Successful';
  });
});

        
    // });
    // this.on('CREATE', 'EmployeeSet', async (req) => {
        
    //   });
    // this.on('CREATE',EmployeeSet, async (req) => {
    //     try {
    //       const {salaryAmount, Currency_code } = req.data;
    //       if (salaryAmount >50000){// || currencyCode !== 'USD') {
    //         req.error(400, "Employees salary must be less than 50000 USD");
    //       } else {
    //         // Simple success response for testing
    //         return { message: 'Create operation successful' };
    //       }
    //     } catch (err) {
    //       req.error(500, `Internal server error: ${err.message}`);
    //     }
    //   });

    // this.before('ON' , EmployeeSet, (req)=>{
    //     var salary = parseInt(req.data.salaryAmount);
    //     if(salary>50000 || currency_code != 'USD'){
    //         req.error(500,'Employee’s salary must be less than 50000 USD');
    //     }
        
        
    // });

//     this.on('UPDATE',EmployeeSet,(req)=>{

//         if(req.data.nameFirst != null && req.data.loginName != null){
//             req.error(500,'Operation not allowed');
//         }


 


    








