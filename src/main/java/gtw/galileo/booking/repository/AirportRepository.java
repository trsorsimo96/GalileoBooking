package gtw.galileo.booking.repository;

import gtw.galileo.booking.domain.Airport;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Airport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {

}