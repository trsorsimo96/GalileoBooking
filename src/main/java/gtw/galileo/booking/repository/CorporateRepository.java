package gtw.galileo.booking.repository;

import gtw.galileo.booking.domain.Corporate;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Corporate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CorporateRepository extends JpaRepository<Corporate, Long> {

}
