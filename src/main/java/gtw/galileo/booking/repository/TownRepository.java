package gtw.galileo.booking.repository;

import gtw.galileo.booking.domain.Town;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Town entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TownRepository extends JpaRepository<Town, Long> {

}
