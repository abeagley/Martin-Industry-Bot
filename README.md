# EE-Industry-Bot
Creating a discord bot that handles Corporation industry needs

Need:
[ ] - Command handler 

Commands for: 
  [ ] - Ore Purchase
  [ ] - PR Purchase
  [ ] - Ore and PR Quotes
  
  
Further projects
  [ ] - Accounting System
  [ ] - Production Line system
  
  
Planned Process for Ore Purchase: 
```
Input by player: 
  !ore vel=200 sco=3000 pyr=4000 || !ore veldspar=200 || !ore vel 200 sco 3000 || !ore veldspar 2000
  
Output by bot:
  Embeded message: 
    Job#1
    Status: Sale Request
    Ore: Veldspar 200  Scordite 3000 Pyroxeres 4000
    @Industry-Officer: Ore deposited [tick] [cross]
    
  [cross] > Edit-message-output
  Job#1
  Status: Closed (Incorrect Ore Value)
  @player: Please chack quantity and resubmit
  
  ||
  
  [tick] > Edit-message-ouput
  Job#1
  Status: Deposit Confirmed
  Ore: Veldspar 200  Scordite 3000 Pyroxeres 4000
  @Industry-Officer: Ore Deposited [ticked]
  @Player: Send @Accountant contract requesting ($$$ ISK Calculated)
  Contract Sent? [Ticked/ Unticked]
  
  [Tick] > Edit-message-output
  Job#1
  Status: Contract Sent
  Ore: Veldspar 200  Scordite 3000 Pyroxeres 4000
  @Industry-Officer: Ore Deposited? [ticked]
  @Player: Send @Accountant contract requesting ($$$ ISK Calculated)
  Contract Sent? [ticked]
  @Accountant Contract Paid [ticked / unticked]
  
  [tick]: Edit-message-ouput
  Job#
  Status: Complete
   Ore: Veldspar 200  Scordite 3000 Pyroxeres 4000
  @Industry-Officer: Ore Deposited? [ticked]
  @Player: Send @Accountant contract requesting ($$$ ISK Calculated)
  Contract Sent? [ticked]
  @Accountant Contract Paid [ticked]
  
  
  Quants to track digitally
    Job#: Status, Ore#, isk, @user sent, @user received 
    Total: Ore#, Total isk
    @Player: Ore#, isk received
    @Industry-Officer: isk sent
  ```
  Manual Inputs
    Ore Deposit Contract
    Check
    Isk Contract
    Check

  Future data > Accounting
  
  
  
