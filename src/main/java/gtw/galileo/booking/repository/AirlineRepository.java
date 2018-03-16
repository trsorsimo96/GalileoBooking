package gtw.galileo.booking.repository;

import gtw.galileo.booking.domain.Airline;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Airline entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AirlineRepository extends JpaRepository<Airline, Long> {

}
