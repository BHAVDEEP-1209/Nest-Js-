export interface Cat {

}

// as class DTO already validates incoming payload in network layer so interface is used for type checking in business logic
// after transpiling to js, interface is removed
// pipes require variable metadata at runtime provided by classes
