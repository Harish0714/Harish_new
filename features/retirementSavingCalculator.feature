Feature: retirement saving calculator page

  Scenario Outline: Calculate the retirement needs after updating the form with default values
    Given User opens the retirement calculator page
    When User enters the "<retirementData>" with default values "<useDefault>"
    And User submits the retirement calculator form
    Then User should see the estimated retirement needs

    Examples:
      | retirementData   | useDefault |
      | requireFieldUser | true       |
      | requireFieldUser | false      |

  Scenario Outline: Calculate the retirement needs based on all required fields filled by the user
    Given User opens the retirement calculator page
    When User enters the "<retirementData>"
    And User submits the retirement calculator form
    Then User should see the estimated retirement needs

    Examples:
      | retirementData   |
      | requireFieldUser |

  Scenario Outline: User checking the error message for retirement calculator with different set of invalid age data.
    Given User opens the retirement calculator page
    When User enters the "<retirementData>"
    And User submits the retirement calculator form
    Then User should see the error message for invalid fields

    Examples:
      | retirementData    |
      | invalideAge       |
      | invalideRetireage |

  Scenario Outline: Calculate retirement needs single marital status people
    Given User opens the retirement calculator page
    When User enters the "<retirementData>"
    Then User should click Social Security benefits and choose "<maritalStatus>" option and enter the amount
    And User submits the retirement calculator form
    Then User should see the estimated retirement needs

    Examples:
      | retirementData   | maritalStatus |
      | requireFieldUser | single        |
      | requireFieldUser | married       |

  Scenario: user selects social security option as enable on pre-retirement calculator page
    Given User opens the retirement calculator page
    When user selects social security field as "yes" on pre-retirement calculator
    Then user should "see" social security fields as visible

  Scenario: user selects social security option as disable on pre-retirement calculator page
    Given User opens the retirement calculator page
    When user selects social security field as "no" on pre-retirement calculator
    Then user should "not see" social security fields as visible
